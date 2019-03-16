import axios from 'axios';
import socket from '../socket';

// Initial State
const initialState = {
  messages: [],
  messageDrafts: {},
  unreadCounts: [],
};

// Action Types
const GET_MESSAGES = 'GET_MESSAGES';
const GET_MESSAGE = 'GET_MESSAGE';
const DRAFT_MESSAGE = 'DRAFT_MESSAGE';
const GET_UNREAD_MESSAGE_COUNTS = 'GET_UNREAD_MESSAGE_COUNTS';

// Action Creators
export const getMessages = messages => {
  return { type: GET_MESSAGES, messages };
};

export const getMessage = message => {
  console.log('hi');
  return { type: GET_MESSAGE, message };
};

export const draftMessage = (content, channelId) => {
  return { type: DRAFT_MESSAGE, content, channelId };
};

export const getUnreadMessageCounts = unreadCounts => {
  return { type: GET_UNREAD_MESSAGE_COUNTS, unreadCounts };
};

// Thunk Creators
export const fetchMessages = () => {
  return async dispatch => {
    const { data: messages } = await axios.get('/api/messages');
    dispatch(getMessages(messages));
  };
};

export const postMessage = message => {
  return async dispatch => {
    const { data: newMessage } = await axios.post('/api/messages', message);
    dispatch(getMessage(newMessage));
    socket.emit('new-message', newMessage);
  };
};

export const fetchUnreadMessageCounts = userId => {
  return async dispatch => {
    const { data: unreadMessagesArray } = await axios.get(
      `/api/users/${userId}/unread-message-counts`
    );
    dispatch(getMessage(unreadMessagesArray));
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case DRAFT_MESSAGE:
      return {
        ...state,
        messageDrafts: {
          ...state.messageDrafts,
          [action.channelId]: action.content,
        },
      };
    case GET_UNREAD_MESSAGE_COUNTS:
      return {
        ...state,
        unreadCounts: action.unreadCounts,
      };
    default:
      return state;
  }
};

export default reducer;
