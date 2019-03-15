import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Sidebar,
  Navbar,
  Login,
  Signup,
  NewChannelEntry,
  ChannelMessages,
} from './components';
import { me, fetchChannels, fetchMessages } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Navbar
          pathname={this.props.location.pathname}
          history={this.props.history}
        />
        {isLoggedIn ? <Sidebar /> : null}
        <main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/new-channel" component={NewChannelEntry} />
                <Route
                  path="/channels/:channelId"
                  component={ChannelMessages}
                />
                <Redirect to="/channels/1" />
              </Switch>
            )}
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapState = state => {
  return {
    // Being 'logged in' will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchMessages());
      dispatch(fetchChannels());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
