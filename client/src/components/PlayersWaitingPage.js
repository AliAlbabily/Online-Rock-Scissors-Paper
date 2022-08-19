import React, { useState, useContext } from 'react';

import Grid from '@mui/material/Grid';
import IconWithText from './IconWithText';
import LoadingImage from '../images/loadingImage.gif';
import { useNavigate } from "react-router-dom";
import { SocketContext } from '../context/socket';

function PlayersWaitingPage() {
    const socket = useContext(SocketContext)
    const [onlineStatus, setOnlineStatus] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState()
    const navigate = useNavigate()

    // update some ui-elements when all the clients are registered
    socket.on('waiting-page-actions', conditionStatus => {
        setOnlineStatus(conditionStatus)
        countDown()
    })

    function countDown() {
        let secondsLeft = 3
        setLoadingMessage(`The game will start in ${secondsLeft}..`)

        const timeCounter = setInterval(() => {
            if(secondsLeft <= 1) {
                clearInterval(timeCounter)
                switchComponent()
            }
            else {
                secondsLeft -= 1
                setLoadingMessage(`The game will start in ${secondsLeft}..`)
            }
        }, 1000)
    }

    function switchComponent() {
        navigate("../gamepage")
    }

    return ( 
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3}>
                <IconWithText text="Player 1" everyoneIsOnline={onlineStatus} />
            </Grid>
            <Grid item xs={3} sx={{gap: 3}} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src={LoadingImage} alt="Loading" style={{width: '100%', maxWidth: '200px', height: 'auto'}}/>
                <p style={{width: '100%', textAlign: 'center'}}>
                    {!onlineStatus ? "Waiting for players to join.." : loadingMessage}
                </p>
            </Grid>
            <Grid item xs={3}>
                <IconWithText text="Player 2" everyoneIsOnline={onlineStatus} />
            </Grid>
        </Grid>
    );
}

export default PlayersWaitingPage;