import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/socket';

import mirrorImage from '../images/mirror.png';
import swordImage from '../images/sword.png';
import magicImage from '../images/magic.png';

function ActionsDisplay() {
    const socket = useContext(SocketContext)
    const [client1ActionText, setClient1ActionText] = useState()
    const [client2ActionText, setClient2ActionText] = useState()
    const [clientsActionsResultText, setClientsActionsResultText] = useState()
    const [client1ActionImage, setClient1ActionImage] = useState()
    const [client2ActionImage, setClient2ActionImage] = useState()

    socket.on('send-actions-result', (client1Name, client2Name, client1Action, client2Action, winnerName) => {
        setClient1ActionText(client1Name +  " chose " + client1Action)
        setClient2ActionText(client2Name +  " chose " + client2Action)

        const actionImage1 = getRightActionImage(client1Action)
        setClient1ActionImage(actionImage1)
        const actionImage2 = getRightActionImage(client2Action)
        setClient2ActionImage(actionImage2)

        if (winnerName === "Draw") setClientsActionsResultText("Draw")
        else setClientsActionsResultText(winnerName + " won!")
    })

    function getRightActionImage(action) {
        if (action === "Sword") 
            return swordImage
        else if (action === "Magic")
            return magicImage
        else if (action === "Mirror")
            return mirrorImage

        return null
    }

    return (
        <div style={{backgroundColor: "#ffffff", height: "250px", maxWidth: "800px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginRight: "-360px", // to remove extra space from using "flex"
            }}
        >
            <div>
                <img src={client1ActionImage} style={{height: '150px', filter: "drop-shadow(2px 2px 2px black)"}} alt="" />
                <p style={{marginTop: '10px', textAlign: "center"}}>{!client1ActionText ?  "" : client1ActionText}</p>
            </div>
            <p>{!clientsActionsResultText ? "" : clientsActionsResultText}</p>
            <div>
                <img src={client2ActionImage} style={{height: '150px', filter: "drop-shadow(2px 2px 2px black)"}} alt="" />
                <p style={{marginTop: '10px', textAlign: "center"}}>{!client2ActionText ? "" : client2ActionText}</p>
            </div>
        </div>
    );
}

export default ActionsDisplay;