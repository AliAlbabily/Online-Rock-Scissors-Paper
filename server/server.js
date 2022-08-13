
const clientsRegistered = {
    pos1: "",
    pos2: ""
}

const clientsInfo = {
    client1: {
        id: "",
        name: "",
        image: null,
        hp: 5,
        actionIsPerformed: false,
        latestAction: ""
    },
    client2: {
        id: "",
        name: "",
        image: null,
        hp: 5,
        actionIsPerformed: false,
        latestAction: ""
    }
}

const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    const clientID = socket.id
    console.log(clientID)

    // assign the client a position
    socket.on('register-client-info', (playerName, playerImage, callback) => {
        let clientAtPos1 = getClientIDPos1()
        let clientAtPos2 = getClientIDPos2()

        if (clientAtPos1 != clientID && clientAtPos2 != clientID) { // if the client is not registered in either position
            const registered = registerClient(clientID, playerName, playerImage)

            if (registered) { // if registered successfully
                callback("The player has been registered.", false)

                clientAtPos1 = getClientIDPos1()
                clientAtPos2 = getClientIDPos2()

                if (clientAtPos1 && clientAtPos2) { // if there are 2 clients
                    allClientsRegisteredActions()
                }
            } 
            else callback("No space available. Cannot register the player!", true)
        }
    })

    socket.on('get-clients-info', callback => {
        callback(clientsInfo)
    })

    socket.on('send-client-action', (action, id) => {
        registerClientAction(action, id)
        const allClientsHavePerformedActions = checkAllClientsActions()
        const actionsResult = compareAllClientsActions(allClientsHavePerformedActions)
        resetAllClientsActions(allClientsHavePerformedActions)
        sendClientsActionsResult(allClientsHavePerformedActions, actionsResult)
        // TODO: check clients' hp and set the winner
    })
})

function registerClient(clientID, playerName, playerImage) {
    if (!clientsRegistered.pos1) { // check if position 1 is empty
        clientsRegistered.pos1 = clientID // register the client to this position
        console.log("pos1: " + clientsRegistered.pos1 + " & pos2: " + clientsRegistered.pos2) // left for testing
        clientsInfo.client1.id = clientID
        clientsInfo.client1.name = playerName
        clientsInfo.client1.image = playerImage
        return true
    }
    else if (!clientsRegistered.pos2) { // check if position 2 is empty
        clientsRegistered.pos2 = clientID // register the client to this position
        console.log("pos1: " + clientsRegistered.pos1 + " & pos2: " + clientsRegistered.pos2) // left for testing
        clientsInfo.client2.id = clientID
        clientsInfo.client2.name = playerName
        clientsInfo.client2.image = playerImage
        return true
    }
    else return false
}

function registerClientAction(action, clientId) {
    if (clientId === clientsInfo.client1.id) {
        console.log("Action performed by client 1")
        clientsInfo.client1.actionIsPerformed = true
        clientsInfo.client1.latestAction = action
    }
    else if (clientId === clientsInfo.client2.id) {
        console.log("Action performed by client 2")
        clientsInfo.client2.actionIsPerformed = true
        clientsInfo.client2.latestAction = action
    }
}

// check if all clients have performed an action
function checkAllClientsActions() {
    if (clientsInfo.client1.actionIsPerformed && clientsInfo.client2.actionIsPerformed) {
        console.log("All clients have performed an action")
        return true
    }
    else {
        console.log("Waiting for 1 more player to perform an action")
        return false
    }
}

function compareAllClientsActions(allClientsHavePerformedActions) {
    if (allClientsHavePerformedActions) {
        const client1Action = clientsInfo.client1.latestAction
        const client2Action = clientsInfo.client2.latestAction

        if (client1Action === client2Action) {
            console.log("1: Draw")
            return "Draw"
        }
        else if (client1Action === "Sword") {
            if (client2Action === "Mirror") {
                console.log("2: " + clientsInfo.client1.name + " wins!")
                updateClientHP("client2")
                return clientsInfo.client1.name
            }
            else if (client2Action === "Magic") {
                console.log("3: " + clientsInfo.client2.name + " wins!")
                updateClientHP("client1")
                return clientsInfo.client2.name
            }
        }
        else if (client1Action === "Mirror") {
            if (client2Action === "Sword") {
                console.log("4: " + clientsInfo.client2.name + " wins!")
                updateClientHP("client1")
                return clientsInfo.client2.name
            }
            else if (client2Action === "Magic") {
                console.log("5: " + clientsInfo.client1.name + " wins!")
                updateClientHP("client2")
                return clientsInfo.client1.name
            }
        }
        else if (client1Action === "Magic") {
            if (client2Action === "Sword") {
                console.log("6: " + clientsInfo.client1.name + " wins!")
                updateClientHP("client2")
                return clientsInfo.client1.name
            }
            else if (client2Action === "Mirror") {
                console.log("7: " + clientsInfo.client2.name + " wins!")
                updateClientHP("client1")
                return clientsInfo.client2.name
            }
        }
    }
}

/** @param {string} clientToUpdate : the client that lost the round */
function updateClientHP(clientToUpdate) {
    let newClientHP = 0

    if (clientToUpdate === "client1") {
        newClientHP = clientsInfo.client1.hp - 1
        sendUpdatedClientHP(newClientHP, clientToUpdate)
    }
    else if (clientToUpdate === "client2") {
        newClientHP = clientsInfo.client2.hp - 1
        sendUpdatedClientHP(newClientHP, clientToUpdate)
    }
}

// send the updated client's hp back to all clients
function sendUpdatedClientHP(hpToSend, selectedClient) {
    io.emit("send-client-hp", hpToSend, selectedClient)
}

// send the result of clients' actions back to the clients
function sendClientsActionsResult(allClientsHavePerformedActions, winnerName) {
    if (allClientsHavePerformedActions) {
        const client1Action = clientsInfo.client1.latestAction
        const client2Action = clientsInfo.client2.latestAction
        const client1Name = clientsInfo.client1.name
        const client2Name = clientsInfo.client2.name
        io.emit("send-actions-result", client1Name, client2Name, client1Action, client2Action, winnerName)
    }
}

// change the status of all clients actions to "false"
function resetAllClientsActions(allClientsHavePerformedActions) {
    if (allClientsHavePerformedActions) {
        clientsInfo.client1.actionIsPerformed = false
        clientsInfo.client2.actionIsPerformed = false
    }
}

function getClientIDPos1() {
    return clientsRegistered['pos1'] // get value (clientID)
}

function getClientIDPos2() {
    return clientsRegistered['pos2'] // get value (clientID)
}

// trigger actions when all the clients are registered
async function allClientsRegisteredActions() {
    await delay(2000)
    io.emit('waiting-page-actions', true)
}

// wait for a period of time
function delay(time) { 
    return new Promise(resolve => setTimeout(resolve, time));
}