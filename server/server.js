
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
        // TODO : reset all clients' "actionIsPerformed" & set them to "false"
        // TODO : compare clients' actions
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