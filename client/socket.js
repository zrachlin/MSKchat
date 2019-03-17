import io from 'socket.io-client';
import store, {
  getMessage,
  getChannel,
  fetchUnreadMessageCounts,
} from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Socket connection made to the server');

  socket.on('new-message', message => {
    store.dispatch(getMessage(message));
    store.dispatch(fetchUnreadMessageCounts());
  });

  socket.on('new-channel', channel => {
    store.dispatch(getChannel(channel));
  });
});

export default socket;
