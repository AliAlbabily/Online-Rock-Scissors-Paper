import React from 'react';
import io from 'socket.io-client';

const ipAddress = process.env.REACT_APP_IP

export const socket = io.connect("http://" + ipAddress + ":3001/")
export const SocketContext = React.createContext()