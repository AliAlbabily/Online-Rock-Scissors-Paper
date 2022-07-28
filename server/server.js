
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
    console.log(socket.id)

    // register and add the client in the server
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
    socket.on('send-client-info', (clientId, callback) => {
        const clientAtPos1 = positions['pos1'] // get value
        const clientAtPos2 = positions['pos2'] // get value
        let assignedPosition = ""

        if (clientAtPos1 === clientId) { // check if the clientId matches
            assignedPosition = "left" // assign client to this position
        }
        else if (clientAtPos2 === clientId) { // check if the clientId matches
            assignedPosition = "right" // assign client to this position
        }

        callback(assignedPosition)
    })
})