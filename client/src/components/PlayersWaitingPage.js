import React, { useState, useContext } from 'react';

import Grid from '@mui/material/Grid';
import IconWithText from './IconWithText';
import LoadingImage from '../images/loadingImage.gif';
import { SocketContext } from '../context/socket';

function PlayersWaitingPage() {
    const socket = useContext(SocketContext)
    const [onlineStatus, setOnlineStatus] = useState(false)

    // change icons color when everyone is online
    socket.on('update-icons-color', conditionStatus => {
        setOnlineStatus(conditionStatus)
    })

    return ( 
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3}>
                <IconWithText text="Player 1" everyoneIsOnline={onlineStatus} />
            </Grid>
            <Grid item xs={3} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src={LoadingImage} alt="Loading" style={{width: '100%', maxWidth: '200px', height: 'auto'}}/>
                <p style={{width: '100%', textAlign: 'center'}}>Waiting for players to join..</p>
            </Grid>
            <Grid item xs={3}>
                <IconWithText text="Player 2" everyoneIsOnline={onlineStatus} />
            </Grid>
        </Grid>
    );
}

export default PlayersWaitingPage;