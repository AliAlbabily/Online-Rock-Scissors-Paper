import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import defaultImage from '../images/picture.png';

function ProfileForm() {
    const [selectedFile, setSelectedFile] = useState()
    const [selectedFileName, setSelectedFileName] = useState()
    const [selectedPlayerName, setSelectedPlayerName] = useState()

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
        console.log(selectedFileName)
        console.log(selectedPlayerName)
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