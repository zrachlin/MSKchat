import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';
import NewMessageEntry from './newMessageEntry';
import axios from 'axios';
import { fetchUnreadMessageCounts } from '../store';
class ChannelMessages extends Component {
  async componentDidMount() {
    const channelId = this.props.match.params.channelId;
    await axios.put(`/api/users/me/latest-channel-visits/${channelId}`);
    this.props.fetchUnreadMessageCounts();
  }
  async componentDidUpdate(prevProps) {
    const newChannelId = this.props.match.params.channelId;
    const prevChannelId = prevProps.match.params.channelId;
    if (newChannelId !== prevChannelId) {
      await axios.put(`/api/users/me/latest-channel-visits/${newChannelId}`);
      await axios.put(`/api/users/me/latest-channel-visits/${prevChannelId}`);
      this.props.fetchUnreadMessageCounts();
    }
  }

  async componentWillUnmount() {
    const channelId = this.props.match.params.channelId;
    await axios.put(`/api/users/me/latest-channel-visits/${channelId}`);
    this.props.fetchUnreadMessageCounts();
  }

  render() {
    const channelId = Number(this.props.match.params.channelId);
    const channelMessages = this.props.messages.filter(
      message => message.channelId === channelId
    );

    return (
      <div>
        <ul className="media-list">
          {channelMessages
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
            .map(message => (
              <Message
                message={message}
                key={message.id}
                userId={this.props.userId}
              />
            ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    userId: state.user.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUnreadMessageCounts: () => dispatch(fetchUnreadMessageCounts()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMessages);
