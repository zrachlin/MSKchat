import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postChannel } from '../store';

class NewChannelEntry extends Component {
  constructor() {
    super();
    this.state = { channelName: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createChannel({ name: this.state.channelName });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="channelName"
            value={this.state.channelName}
            onChange={this.handleChange}
            placeholder="Enter a channel name..."
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default">
            Create Channel
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createChannel: channel => dispatch(postChannel(channel, ownProps.history)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewChannelEntry);
