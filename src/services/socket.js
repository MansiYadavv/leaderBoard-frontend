import { io } from 'socket.io-client';
// const socket = io('http://localhost:3000');
const socket = io(import.meta.env.VITE_SOCKET_URL);


export default socket;
