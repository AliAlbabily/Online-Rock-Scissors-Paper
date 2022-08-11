import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../context/socket';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import defaultImage from '../images/picture.png';

function GamePage() {
    // const socket = useContext(SocketContext)
    // const [client1Name, setclient1Name] = useState()
    // const [client2Name, setclient2Name] = useState()

    // useEffect(() => { // equivalent to componentDidMount
    //     socket.emit('get-clients-info', clientsInfo => {
    //         console.log(clientsInfo)
    //         setclient1Name(clientsInfo.client1.name)
    //         setclient2Name(clientsInfo.client2.name)
    //     })
    // }, [])

    return ( 
        <div style={{minWidth: "800px", height: "fit-content", backgroundColor: "grey" }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                <Grid item xs={12}>
                    <div style={{backgroundColor: "#ffffff", height: "250px" }}>1</div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{backgroundColor: "#ffffff", height: "250px", 
                        display: "flex", 
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <Box component="img" sx={{height: '150px', maxWidth: '150px'}}
                            style={{objectFit: 'cover', filter: 'drop-shadow(0 0 0.1rem rgb(0, 0, 0))'}}
                            src={defaultImage}
                        />
                        <div>
                            <p>Player 1</p>
                            <p>HP: 5</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{backgroundColor: "#ffffff", height: "250px"}}>3</div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{backgroundColor: "#ffffff", height: "250px",
                        display: "flex", 
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <Box component="img" sx={{height: '150px', maxWidth: '150px'}}
                            style={{objectFit: 'cover', filter: 'drop-shadow(0 0 0.1rem rgb(0, 0, 0))'}}
                            src={defaultImage}
                        />
                        <div>
                            <p>Player 2</p>
                            <p>HP: 5</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default GamePage;