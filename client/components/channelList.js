import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

class ChannelList extends Component {
  render() {
    const { messages, channels } = this.props;

    return (
      <ul>
        {channels.map(channel => {
          return (
            <li key={channel.id}>
              <NavLink to={`/channels/${channel.id}`} activeClassName="active">
                <span># {channel.name}</span>
                <span className="badge">
                  {
                    messages.filter(message => message.channelId === channel.id)
                      .length
                  }
                </span>
              </NavLink>
            </li>
          );
        })}

        <li>
          <NavLink to="/new-channel">Create a channel...</NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    channels: state.channels,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(ChannelList)
);
