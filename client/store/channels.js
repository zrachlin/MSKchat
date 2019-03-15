import axios from 'axios';
import socket from '../socket';

// Initial State
const initialChannels = [];

// Action Types
const GET_CHANNELS = 'GET_CHANNELS';
const GET_CHANNEL = 'GET_CHANNEL';

// Action Creators
export const getChannels = channels => {
  return { type: GET_CHANNELS, channels };
};

export const getChannel = channel => {
  return { type: GET_CHANNEL, channel };
};

// Thunk Creators
export const fetchChannels = () => {
  return async dispatch => {
    const { data: channels } = await axios.get('/api/channels');
    dispatch(getChannels(channels));
  };
};

export const postChannel = (channel, history) => {
  return async dispatch => {
    const { data: newChannel } = await axios.post('/api/channels', channel);
    dispatch(getChannel(newChannel));
    socket.emit('new-channel', newChannel);
    history.push(`/channels/${newChannel.id}`);
  };
};

const reducer = (channels = initialChannels, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      return action.channels;
    case GET_CHANNEL:
      return [...channels, action.channel];
    default:
      return channels;
  }
};

export default reducer;
