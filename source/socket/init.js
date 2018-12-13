// Core
import io from 'socket.io-client';

export const socket = io('https://Lab.Lectrum.io', {
    path: '/react/ws',
});
