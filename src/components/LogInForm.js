import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const LogInForm = (props) => {
//on form submission, get the input values, check database to see if user exists, password hashes match, if pass, authenticate, send token back
// const logInSubmit = (e) => {
//   e.preventDefault();
//   console.log('submitted');
// }
    return (
      <div className="container-fluid">
        <div className="container">
          <form className="padded" onSubmit={props.submitFunction}>
            <div className="row justify-content-center">
              <div className="col-12 align-self-center">
                <input className="form-control mr-sm-2" type="email" placeholder="email" />
              </div>
              <div className="col-12 align-self-center">
                <input className="form-control mr-sm-2" type="password" placeholder="password" />
              </div>
              <div className="col-12 align-self-center">
                <button className="btn btn-outline-info btn-block my-2 my-sm-0" type="submit">Log In</button>
              </div>
            </div>
          </form>
          <p className="text-center">or</p>
          <div className="row justify-content-center padded">
            <div className="col-12 align-self-center">
              <Link to="/signup"><button className="btn btn-outline-success btn-block my-2 my-sm-0 text-white">Create New Account</button></Link>
            </div>
          </div>
        </div>
      </div>
        )}

export default LogInForm;
