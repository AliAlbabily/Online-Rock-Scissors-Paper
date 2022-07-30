
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

    // automatically register and add the client in the server
    if (!positions.pos1) { // check if position 1 is empty
        positions.pos1 = socket.id // register the client to this position
        console.log("pos1: " + positions.pos1 + " & pos2: " + positions.pos2)
    }
    else if (!positions.pos2) { // check if position 2 is empty
        positions.pos2 = socket.id // register the client to this position
        console.log("pos1: " + positions.pos1 + " & pos2: " + positions.pos2)
    }
    else {
        console.log("Cannot be registered!")
    }

    // assign the client a position
    socket.on('send-client-info', callback => {
        const clientAtPos1 = positions['pos1'] // get value
        const clientAtPos2 = positions['pos2'] // get value

        if (clientAtPos1 != clientID && clientAtPos2 != clientID) { // if the player is not registered in either position
            callback("The server is full. Please try again at some other time.", true)
        } 
        else callback("Waiting for players to join", false)
    })
})