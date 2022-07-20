import React from 'react';

import Grid from '@mui/material/Grid';
import IconWithText from './IconWithText';
import LoadingImage from '../images/loadingImage.gif';

function PlayersWaitingPage() {
    return ( 
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3}>
                <IconWithText text="Player 1"/>
            </Grid>
            <Grid item xs={3}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={LoadingImage} alt="Loading" style={{width: '100%', maxWidth: '200px', height: 'auto'}}/>
                    <p style={{width: '100%', textAlign: 'center'}}>Waiting for players to join..</p>
                </div>
            </Grid>
            <Grid item xs={3}>
                <IconWithText text="Player 2"/>
            </Grid>
        </Grid>
    );
}

export default PlayersWaitingPage;