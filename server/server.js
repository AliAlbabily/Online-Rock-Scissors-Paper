
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
        origin: [ // listens to allowed origins
            "https://alialbabily.github.io", 
            "http://localhost:3000",
            "https://alialbabily.github.io/Online-Rock-Scissors-Paper"
        ],
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    const clientID = socket.id
    console.log(clientID)

    // assign the client a position
    socket.on('register-client-info', (playerID, playerName, playerImage, callback) => {  
        const registered = registerClient(playerID, playerName, playerImage)

        if (registered) { // if registered successfully
            callback("The player has been registered.", false)

            if (clientsRegistered.pos1 && clientsRegistered.pos2) { // if all clients are connected
                allClientsRegisteredActions()
            }
        } 
        else callback("No space available. Cannot register the player!", true)
    })

    socket.on('get-clients-info', callback => {
        callback(clientsInfo)
    })

    socket.on('send-client-action', (action, id) => {
        registerClientAction(action, id)
        const allClientsHavePerformedActions = checkAllClientsActions()
        if (allClientsHavePerformedActions) {
            const actionsResult = compareAllClientsActions()
            sendClientsActionsResult(actionsResult)
            const gameIsOver = checkIfGameIsOver()
            if (gameIsOver) endTheGame()
            else initiateNewRound()
        }
    })
})

function registerClient(playerID, playerName, playerImage) {
    if (clientsRegistered.pos1 === "") { // check if position 1 is empty
        clientsRegistered.pos1 = playerID // register the client to this position
        console.log("pos1: " + clientsRegistered.pos1 + " & pos2: " + clientsRegistered.pos2) // left for testing
        clientsInfo.client1.id = playerID
        clientsInfo.client1.name = playerName
        clientsInfo.client1.image = playerImage
        return true
    }
    if (clientsRegistered.pos2 === "") { // check if position 2 is empty
        clientsRegistered.pos2 = playerID // register the client to this position
        console.log("pos1: " + clientsRegistered.pos1 + " & pos2: " + clientsRegistered.pos2) // left for testing
        clientsInfo.client2.id = playerID
        clientsInfo.client2.name = playerName
        clientsInfo.client2.image = playerImage
        return true
    }
    return false
}

function registerClientAction(action, clientId) {
    if (clientId === clientsInfo.client1.id) {
        console.log("Client 1 chose: " + action)
        clientsInfo.client1.actionIsPerformed = true
        clientsInfo.client1.latestAction = action
    }
    else if (clientId === clientsInfo.client2.id) {
        console.log("Client 2 chose: " + action)
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

function compareAllClientsActions() {
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

/** @param {string} clientToUpdate : the client that lost the round */
function updateClientHP(clientToUpdate) {
    let newClientHP = 0

    if (clientToUpdate === "client1") {
        newClientHP = clientsInfo.client1.hp - 1
        sendUpdatedClientHP(newClientHP, clientToUpdate)
        clientsInfo.client1.hp = newClientHP // update client's hp stored in the server
    }
    else if (clientToUpdate === "client2") {
        newClientHP = clientsInfo.client2.hp - 1
        sendUpdatedClientHP(newClientHP, clientToUpdate)
        clientsInfo.client2.hp = newClientHP // update client's hp stored in the server
    }
}

// send the updated client's hp back to all clients
function sendUpdatedClientHP(hpToSend, selectedClient) {
    io.emit("send-client-hp", hpToSend, selectedClient)
}

// send the result of clients' actions back to the clients
function sendClientsActionsResult(winnerName) {
    const client1Action = clientsInfo.client1.latestAction
    const client2Action = clientsInfo.client2.latestAction
    const client1Name = clientsInfo.client1.name
    const client2Name = clientsInfo.client2.name
    io.emit("send-actions-result", client1Name, client2Name, client1Action, client2Action, winnerName)
}

// change the status of all clients actions to "false"
function resetAllClientsActions() {
    clientsInfo.client1.actionIsPerformed = false
    clientsInfo.client2.actionIsPerformed = false
}

// check if there is a winner and return a signal when the game is over
function checkIfGameIsOver() {
    if (clientsInfo.client1.hp === 0) {
        return true
    }
    else if (clientsInfo.client2.hp === 0) {
        return true
    }
    return false
}

function endTheGame() {
    const winnerName = getWinnerName()
    console.log("Game Over! The winner is " + winnerName)
    io.emit("game-over-signal", winnerName)
    initiateNewGame()
}

function getWinnerName() {
    if (clientsInfo.client1.hp === 0) return clientsInfo.client2.name
    else if (clientsInfo.client2.hp === 0) return clientsInfo.client1.name
}

function initiateNewGame() {
    resetClientsPositions()
    resetClientsData()
}

function resetClientsPositions() {
    clientsRegistered.pos1 = ""
    clientsRegistered.pos2 = ""
}

function resetClientsData() {
    setClientDataToDefault(clientsInfo.client1)
    setClientDataToDefault(clientsInfo.client2)
}

function setClientDataToDefault(client) {
    client.id = ""
    client.name = ""
    client.image = null
    client.hp = 5
    client.actionIsPerformed = false
    client.latestAction = ""
}

function initiateNewRound() {
    resetAllClientsActions()
    io.emit("initiate-new-round", false)
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