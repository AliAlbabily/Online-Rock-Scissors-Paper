import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../context/socket';

function GamePage() {
    const socket = useContext(SocketContext)
    const [client1Name, setclient1Name] = useState()
    const [client2Name, setclient2Name] = useState()

    useEffect(() => { // equivalent to componentDidMount
        socket.emit('get-clients-info', clientsInfo => {
            console.log(clientsInfo)
            setclient1Name(clientsInfo.client1.name)
            setclient2Name(clientsInfo.client2.name)
        })
    }, [])

    return ( 
        <div>
            <h1>{client1Name}</h1>
            <h1>{client2Name}</h1>
        </div>
    );
}

export default GamePage;