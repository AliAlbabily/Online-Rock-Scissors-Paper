import React from 'react';
import io from 'socket.io-client';

// const ipAddress = process.env.REACT_APP_IP
const ipAddress = "localhost"

export const socket = io.connect("http://" + ipAddress + ":3001/") // connects to
export const SocketContext = React.createContext()