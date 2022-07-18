import React from 'react';

import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';

function IconWithText(props) {
    return ( 
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PersonIcon sx={{ fontSize: 80 }} color="action" />
            <p>{props.text}</p>
        </Container>
    );
}

export default IconWithText;