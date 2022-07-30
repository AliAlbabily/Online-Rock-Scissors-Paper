
let positions = {
    pos1: "",
    pos2: ""
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
    socket.on('send-client-info', callback => {
        let clientAtPos1 = getClientIDPos1()
        let clientAtPos2 = getClientIDPos2()

        if (clientAtPos1 != clientID && clientAtPos2 != clientID) { // if the client is not registered in either position
            let registered = registerClient(clientID)

            if (registered) { // if registered successfully
                callback("The player has been registered.", false)

                clientAtPos1 = getClientIDPos1()
                clientAtPos2 = getClientIDPos2()

                if (clientAtPos1 && clientAtPos2) { // if there are 2 clients
                    setTimeout(() => { // trigger an action after a period of time
                        io.emit('update-icons-color', true)
                    }, 2000)
                }
            } 
            else callback("No space available. Cannot register the player!", true)
        }
    })
})

function registerClient(clientID) {
    if (!positions.pos1) { // check if position 1 is empty
        positions.pos1 = clientID // register the client to this position
        console.log("pos1: " + positions.pos1 + " & pos2: " + positions.pos2)
        return true
    }
    else if (!positions.pos2) { // check if position 2 is empty
        positions.pos2 = clientID // register the client to this position
        console.log("pos1: " + positions.pos1 + " & pos2: " + positions.pos2)
        return true
    }
    else return false
}

function getClientIDPos1() {
    return positions['pos1'] // get value (clientID)
}

function getClientIDPos2() {
    return positions['pos2'] // get value (clientID)
}