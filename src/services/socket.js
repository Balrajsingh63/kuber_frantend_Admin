import { io } from 'socket.io-client';
import { socketURL } from './apiConstants';

// "undefined" means the URL will be computed from the `window.location` object
const URL = socketURL
// process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3006/v1/admin/';

export const socket = io(URL, {
  autoConnect: true,
});
