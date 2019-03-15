import React from 'react';

const Message = props => {
  const message = props.message;
  return message.user ? (
    <li className="media">
      <div className="media-left">
        <a href="#">
          <img
            className="media-img"
            src={message.user.image || null}
            alt={message.user.username[0] || null}
          />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">{message.user.username}</h4>
        {message.content}
      </div>
    </li>
  ) : null;
};

export default Message;
