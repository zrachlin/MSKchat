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
        <div className="media-heading">
          <h4>{message.user.username}</h4>
          <h5>
            {new Date(message.createdAt.replace('T', ' ')).toLocaleString()}
          </h5>
        </div>
        <div clasName="media-content">{message.content}</div>
      </div>
    </li>
  ) : null;
};

export default Message;
