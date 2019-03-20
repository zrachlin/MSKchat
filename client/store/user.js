import axios from 'axios';

// Initial State
const defaultUser = {};

// Action Types
export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const GET_UNREAD_MESSAGE_COUNTS = 'GET_UNREAD_MESSAGE_COUNTS';

// Action Creators
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const getUnreadMessageCounts = unreadCounts => {
  return { type: GET_UNREAD_MESSAGE_COUNTS, unreadCounts };
};

// Thunk Creators
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (username, password, method, history) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { username, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/channels/1');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = history => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export const fetchUnreadMessageCounts = () => {
  return async dispatch => {
    const { data: unreadMessagesObj } = await axios.get(
      `/api/users/me/unread-message-counts`
    );
    const { unreadMessagesArray } = unreadMessagesObj;
    dispatch(getUnreadMessageCounts(unreadMessagesArray));
  };
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case GET_UNREAD_MESSAGE_COUNTS:
      return {
        ...state,
        unreadCounts: action.unreadCounts,
      };
    default:
      return state;
  }
}
