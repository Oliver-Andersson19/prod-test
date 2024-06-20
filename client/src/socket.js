import { io } from 'socket.io-client';
// "undefined" means the URL will be computed from the `window.location` object
const URL = "0.0.0.0:10000";

export const socket = io(URL);