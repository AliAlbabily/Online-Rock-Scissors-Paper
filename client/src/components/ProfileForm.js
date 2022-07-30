import React, { useState, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import defaultImage from '../images/picture.png';
import { useNavigate } from "react-router-dom";
import { SocketContext } from '../context/socket';

function ProfileForm() {
    const socket = useContext(SocketContext)

    // connect to the server
    socket.on("connect", () => {
        console.log(`You connected with id: ${socket.id}`)
    })

    const [selectedFile, setSelectedFile] = useState()
    const [selectedFileName, setSelectedFileName] = useState()
    const [selectedPlayerName, setSelectedPlayerName] = useState()
    const navigate = useNavigate()

    const fileSelectedHandler = event => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]))
    }
    
    const fileNameSelectedHandler = event => {
        setSelectedFileName(event.target.files[0].name)
    }

    const nameSelectedHandler = event => {
        setSelectedPlayerName(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        // TODO : pass "selectedFileName" & "selectedPlayerName" as args in "send-client-info"
        // console.log(selectedFileName)
        // console.log(selectedPlayerName)
        
        // ask the server to register the client & return the right position for the client
        socket.emit('send-client-info', (serverResponseString, serverIsFull) => {
            displayMessage(serverResponseString)
            switchComponent(serverIsFull, serverResponseString)
        })
    }

    function switchComponent(serverIsFull, serverResponseString) {
        if (!serverIsFull) { // only allow certain number of players to join at a time
            navigate("../waitingroom")
        }
        else alert(serverResponseString)
    }

    function displayMessage(string) {
        console.log(string)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ gap: 3 }} onSubmit={handleSubmit}>
                <Box 
                    component="img"
                    sx={{
                        height: '200px',
                        maxWidth: '200px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                    style={{objectFit: 'cover', borderRadius: '5px', filter: 'drop-shadow(0 0 0.1rem rgb(0, 0, 0))'}}
                    src={selectedFile != null ? selectedFile : defaultImage}
                />
                <Button variant="contained" component="label" onChange={(e) => {fileSelectedHandler(e); fileNameSelectedHandler(e)}}>
                    Upload player image
                    <input type="file" hidden/>
                </Button>
                <TextField id="outlined-basic" label="Select a name" variant="standard" onChange={nameSelectedHandler}/>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </FormControl>
        </form>
    );
}

export default ProfileForm;