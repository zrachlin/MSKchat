import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage, draftMessage } from '../store';

class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.props.draftMessage(evt.target.value, this.props.channelId);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { draftContent, channelId } = this.props;

    this.props.postMessage({ content: draftContent, channelId });
    this.props.draftMessage('', channelId);
  }

  render() {
    const { draftContent } = this.props;
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={draftContent || ''}
            onChange={this.handleChange}
            placeholder="Whatcha thinkin?"
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Send!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    draftContent: state.messages.messageDrafts[ownProps.channelId],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: message => dispatch(postMessage(message)),
    draftMessage: (string, channelId) =>
      dispatch(draftMessage(string, channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry);
