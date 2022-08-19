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
    const [selectedPlayerName, setSelectedPlayerName] = useState()
    const navigate = useNavigate()

    const fileSelectedHandler = event => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]))
    }
    
    const fileNameSelectedHandler = event => {
        console.log(event.target.files[0].name)
    }

    const nameSelectedHandler = event => {
        setSelectedPlayerName(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        
        // ask the server to register the client & return the right position for the client
        socket.emit('register-client-info', socket.id, selectedPlayerName, selectedFile, (serverResponseString, serverIsFull) => {
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
            <FormControl sx={{ gap: 3 }} style={{padding: "70px", backgroundColor: "azure", borderRadius: "10px", 
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
            }} onSubmit={handleSubmit}
            >
                <Box 
                    component="img"
                    sx={{
                        height: '200px',
                        minWidth: '200px',
                        maxWidth: '200px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                    style={{objectFit: 'cover', borderRadius: '5px', filter: 'drop-shadow(0 0 0.1rem rgb(0, 0, 0))'}}
                    src={selectedFile != null ? selectedFile : defaultImage}
                />
                <Button variant="contained" style={{backgroundColor: "#9c27b0"}} component="label" onChange={(e) => {fileSelectedHandler(e); fileNameSelectedHandler(e)}}>
                    Upload player image
                    <input type="file" hidden/>
                </Button>
                <TextField id="outlined-basic" label="Select a name" variant="standard" onChange={nameSelectedHandler} required/>
                <Button variant="contained" color="secondary" type="submit">Submit</Button>
            </FormControl>
        </form>
    );
}

export default ProfileForm;