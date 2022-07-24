import React from 'react';

import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';

const defalutIconColor = "action"

function IconWithText(props) {
    return ( 
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PersonIcon sx={{ fontSize: 80 }} color={props.userIsOnline ? "success" : "action"}/>
            <p>{props.text}</p>
        </Container>
    );
}

export default IconWithText;