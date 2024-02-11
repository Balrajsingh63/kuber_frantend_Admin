import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'https://kuberbackend-production.up.railway.app';

export const socket = io(URL, {
  autoConnect: true,
});
