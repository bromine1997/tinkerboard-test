// src/socket.js
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.0.125:8080';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

export default socket;
