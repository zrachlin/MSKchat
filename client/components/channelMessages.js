import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';
import NewMessageEntry from './newMessageEntry';

class ChannelMessages extends Component {
  render() {
    const channelId = Number(this.props.match.params.channelId);
    const channelMessages = this.props.messages.filter(
      message => message.channelId === channelId
    );
    console.log(channelMessages);

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
export default connect(
  mapStateToProps,
  null
)(ChannelMessages);
