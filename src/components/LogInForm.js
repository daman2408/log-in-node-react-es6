import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const LogInForm = (props) => {
//on form submission, get the input values, check database to see if user exists, password hashes match, if pass, authenticate, send token back
  const logInSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };
  return (
      <div className="container-fluid">
        <div className="container">
          <form className="padded" onSubmit={props.logIn}>
            <div className="row justify-content-center">
              <div id="usernameBox" className="col-12 align-self-center">
                <input name="username" className="form-control mr-sm-2" type="email" id="username" placeholder="email" />
              </div>
              <div id="passwordBox" className="col-12 align-self-center">
                <input name="password" className="form-control mr-sm-2" type="password" id="plainTextPassword" placeholder="password" />
                <div className="form-control-feedback" id="passwordFeedback" style={{display: 'none'}}>
                  incorrect password
                </div>
              </div>
              <div className="col-12 align-self-center">
                <button className="btn btn-outline-info btn-block my-2 my-sm-0" type="submit">Log In</button>
              </div>
            </div>
          </form>
          <p className="text-center">or</p>
          <div className="row justify-content-center padded">
            <div className="col-12 align-self-center">
              <Link to="/signup"><button className="btn btn-outline-success btn-block my-2 my-sm-0 text-white">Create New</button></Link>

            </div>
          </div>
        </div>
      </div>
  );
};

LogInForm.propTypes = {
  logIn: PropTypes.func
};

export default LogInForm;
