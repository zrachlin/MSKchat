import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';
import NewMessageEntry from './newMessageEntry';
import axios from 'axios';
import { fetchUnreadMessageCounts } from '../store';
class ChannelMessages extends Component {
  async componentDidMount() {
    const channelId = this.props.match.params.channelId;
    console.log('cid', channelId);
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

  render() {
    const channelId = Number(this.props.match.params.channelId);
    const channelMessages = this.props.messages.filter(
      message => message.channelId === channelId
    );
    // console.log(channelMessages);

    return (
      <div>
        <ul className="media-list">
          {channelMessages
            .sort((a, b) => a.id - b.id)
            .map(message => (
              <Message message={message} key={message.id} />
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
