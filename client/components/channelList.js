import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { fetchUnreadMessageCounts } from '../store';

class ChannelList extends Component {
  // componentDidMount() {
  //   this.props.fetchUnreadMessageCounts();
  // }

  createChannelLI(channel) {
    const { pathname, unreadCounts } = this.props;
    const channelId = Number(pathname.split('/').slice(-1));
    let unreadCount = null;
    if (unreadCounts) {
      const unreadObj = unreadCounts.find(el => el.channelId === channel.id);
      if (unreadObj) {
        unreadCount = unreadObj.count;
      }
    }

    return (
      <div key={channel.id}>
        <li>
          <NavLink to={`/channels/${channel.id}`} activeClassName="active">
            <span># {channel.name}</span>
            {channelId !== channel.id && unreadCount > 0 ? (
              <span className="badge">{unreadCount}</span>
            ) : null}
          </NavLink>
        </li>
        {channel.name === 'general' ? <hr /> : null}
      </div>
    );
  }

  render() {
    const { channels } = this.props;

    return (
      <ul>
        <div>
          {/* Always show general channel at the top */}
          {channels.length &&
            this.createChannelLI(
              channels.find(channel => channel.name === 'general')
            )}
          {channels.length &&
            channels
              .filter(channel => channel.name !== 'general')
              .sort(function(a, b) {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
              })
              .map(channel => this.createChannelLI(channel))}
        </div>
        <hr />
        <li id="new-channel-link">
          <NavLink to="/new-channel">Create a channel...</NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages.messages,
    channels: state.channels,
    pathname: ownProps.location.pathname,
    unreadCounts: state.user.unreadCounts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUnreadMessageCounts: () => dispatch(fetchUnreadMessageCounts()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChannelList)
);
