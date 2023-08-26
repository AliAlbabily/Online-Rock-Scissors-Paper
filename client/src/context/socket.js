import React from 'react';
import io from 'socket.io-client';

const ipAddress = "localhost"

export const socket = io.connect("http://" + ipAddress + ":3001/") // connects to the URL of the server
export const SocketContext = React.createContext()