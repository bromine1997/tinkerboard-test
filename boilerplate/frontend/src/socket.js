// src/socket.js
import io from 'socket.io-client';

const SOCKET_URL = 'http://172.30.1.14:8080';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

export default socket;
