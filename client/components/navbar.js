import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

//to-do: add user name and log out here -> will have to connect it to redux

class Navbar extends Component {
  getChannelString() {
    const { channels, pathname } = this.props;
    const channelId = Number(pathname.split('/').slice(-1));
    const currentChannel =
      channels.find(channel => channel.id === channelId) || null;
    const channelStr =
      currentChannel !== null
        ? `# ${currentChannel.name}`
        : 'Create New Channel';
    return channelStr;
  }

  render() {
    const { handleClick, isLoggedIn, username, history } = this.props;

    return (
      <nav>
        <h3>{isLoggedIn ? this.getChannelString() : 'Welcome to MSKchat!'}</h3>
        {isLoggedIn ? (
          <div>
            Hi {username}!
            {/* The navbar will show these links after you log in */}
            <a href="#" onClick={() => handleClick(history)}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    username: state.user.username,
    channels: state.channels,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(logout(ownProps.history));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
