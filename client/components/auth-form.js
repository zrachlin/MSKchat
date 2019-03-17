import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <main className='form'>
      <h1>Welcome to MSK Chat!</h1>
      <h3>{displayName} To Start Chatting!</h3>
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input className="login-signup-input" name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              className="login-signup-input"
              name="password"
              type="password"
            />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </main>
  );
};

// mapStateToProps for Login Component
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

// mapStateToProps for Signup Component
const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(auth(username, password, formName, ownProps.history));
    },
  };
};

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm);
export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
