// src/socket.js
import io from 'socket.io-client';

const SOCKET_URL = 'http://172.30.80.1:8080';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

export default socket;
