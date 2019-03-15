import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

class ChannelList extends Component {
  createChannelLI(channel) {
    const { messages } = this.props;
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
  }

  render() {
    const { channels } = this.props;

    return (
      <ul>
        {/* Always show general channel at the top */}
        {channels.length &&
          this.createChannelLI(
            channels.find(channel => channel.name === 'general')
          )}
        {channels.length &&
          channels
            .filter(channel => channel.name !== 'general')
            .sort(function(a, b) {
              return a.name.toLowerCase() > b.name.toLowerCase();
            })
            .map(channel => this.createChannelLI(channel))}

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
