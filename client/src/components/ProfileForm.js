import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function ProfileForm() {

    const [selectedFile, setSelectedFile] = useState()

    const fileSelectedHandler = event => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]))
    }

    const fileUploadHandler = () => {
        console.log(selectedFile)
    }
    
    return (
        <FormControl sx={{ gap: 3 }}>
            <Box 
                component="img"
                sx={{
                    height: '200px',
                    maxWidth: '200px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                style={{objectFit: 'cover', borderRadius: '5px', filter: 'drop-shadow(0 0 0.1rem rgb(0, 0, 0))'}}
                src={selectedFile != null ? selectedFile : require('../images/picture.png')}
            />
            <Button variant="contained" component="label" onChange={fileSelectedHandler}>
                Upload player image
                <input type="file" hidden onClick={fileUploadHandler}/>
            </Button>
            <TextField id="outlined-basic" label="Select a name" variant="standard" />
            <Button variant="contained" color="primary" type="submit">Submit</Button>
        </FormControl>
    );
}

export default ProfileForm;