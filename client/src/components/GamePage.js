import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../context/socket';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import defaultImage from '../images/picture.png';
import ActionsDisplay from './ActionsDisplay';
import DialogComponent from './DialogComponent'

function GamePage() {
    const socket = useContext(SocketContext)
    const [client1Name, setclient1Name] = useState("Player")
    const [client2Name, setclient2Name] = useState("Player")
    const [client1HitPoints, setclient1HitPoints] = useState(1)
    const [client2HitPoints, setclient2HitPoints] = useState(1)
    const [client1Image, setclient1Image] = useState()
    const [client2Image, setclient2Image] = useState()
    const [buttonsVisibilityStatus, setButtonsVisibilityStatus] = useState(false)
    const [open, setOpen] = useState(false)
    const [winnerName, setWinnerName] = useState("Player")

    useEffect(() => { // equivalent to componentDidMount
        // FIXME: "socket.emit" gets called 2 times. make the "emit" return 1 response
        socket.emit('get-clients-info', clientsInfo => {
            setclient1Name(clientsInfo.client1.name)
            setclient2Name(clientsInfo.client2.name)
            setclient1HitPoints(clientsInfo.client1.hp)
            setclient2HitPoints(clientsInfo.client2.hp)
            setclient1Image(clientsInfo.client1.image)
            setclient2Image(clientsInfo.client2.image)
        })
    }, [socket])

    socket.on('send-client-hp', (newHP, selectedClient) => {
        if (selectedClient === "client1") setclient1HitPoints(newHP)
        else if (selectedClient === "client2") setclient2HitPoints(newHP)
    })

    socket.on("game-over-signal", winnerName => {
        setWinnerName(winnerName)
        setOpen(true)
    })

    socket.on("initiate-new-round", enabled => {
        setButtonsVisibilityStatus(enabled)
    })

    function registerAction(action) {
        setButtonsVisibilityStatus(true)
        socket.emit('send-client-action', action, socket.id)
    }

    const handleClose = (event, reason) => { // FIXME: pressing "ESC" will cause the dialog to close
        if (reason && reason === "backdropClick") return
        setOpen(false)
    }

    return ( 
        <div style={{minWidth: "800px", height: "fit-content"}}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                <Grid item xs={12}>
                    <ActionsDisplay />
                </Grid>
                <Grid item xs={4}>
                    <div style={{backgroundColor: "azure", borderRadius: "5px", height: "250px", 
                        display: "flex", 
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}
                    >
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
                    <div style={{backgroundColor: "azure", borderRadius: "5px", height: "250px", 
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}
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
                    <div style={{backgroundColor: "azure", borderRadius: "5px", height: "250px",
                        display: "flex", 
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-around",
                        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}
                    >
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
            <DialogComponent open={open} onClose={handleClose} winnerName={winnerName} />
        </div>
    );
}

export default GamePage;