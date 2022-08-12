import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../context/socket';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import defaultImage from '../images/picture.png';

function GamePage() {
    const socket = useContext(SocketContext)
    const [client1Name, setclient1Name] = useState("Player")
    const [client2Name, setclient2Name] = useState("Player")
    const [client1HitPoints, setclient1HitPoints] = useState(1)
    const [client2HitPoints, setclient2HitPoints] = useState(1)
    const [client1Image, setclient1Image] = useState()
    const [client2Image, setclient2Image] = useState()
    const [buttonsVisibilityStatus, setButtonsVisibilityStatus] = useState(false)

    useEffect(() => { // equivalent to componentDidMount
        socket.emit('get-clients-info', clientsInfo => {
            setclient1Name(clientsInfo.client1.name)
            setclient2Name(clientsInfo.client2.name)
            setclient1HitPoints(clientsInfo.client1.hp)
            setclient2HitPoints(clientsInfo.client2.hp)
            setclient1Image(clientsInfo.client1.image)
            setclient2Image(clientsInfo.client2.image)
        })
    }, [])

    function registerAction(action) {
        setButtonsVisibilityStatus(true)
        socket.emit('send-client-action', action, socket.id)
    }

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
                            src={client1Image ? client1Image : defaultImage}
                        />
                        <div>
                            <p>{client1Name}</p>
                            <p>HP: {client1HitPoints}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{backgroundColor: "#ffffff", height: "250px", 
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center"}}
                    >
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px'}}
                            onClick={() => { registerAction("Sword") }}
                            disabled={buttonsVisibilityStatus}
                        >
                            Sword
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px'}}
                            onClick={() => { registerAction("Magic") }}
                            disabled={buttonsVisibilityStatus}
                        >
                            Magic
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px'}}
                            onClick={() => { registerAction("Mirror") }}
                            disabled={buttonsVisibilityStatus}
                        >
                            Mirror
                        </Button>
                    </div>
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
                            src={client2Image ? client2Image : defaultImage}
                        />
                        <div>
                            <p>{client2Name}</p>
                            <p>HP: {client2HitPoints}</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default GamePage;