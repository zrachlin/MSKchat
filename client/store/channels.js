import axios from 'axios';
import socket from './socket';

// Initial State
const initialState = {
  channels: [],
};

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

export const postChannel = channel => {
  return async dispatch => {
    const { data: newChannel } = await axios.post('/api/channels', channel);
    dispatch(getChannel(newChannel));
    socket.emit('new-channel', newChannel);
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      return {
        ...state,
        channels: action.channels,
      };
    case GET_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel],
      };
    default:
      return state;
  }
};

export default reducer;
