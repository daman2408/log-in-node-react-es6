import React from 'react';
import PropTypes from 'prop-types';

const SignUp = (props) => {
  return(
    <div className="container" noValidate>
      <form onSubmit={props.signUp}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-10">
            <input type="text" name="firstName" className="form-control" id="inputFirstName" placeholder="First Name" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Last Name</label>
          <div className="col-sm-10">
            <input type="text" name="lastName" className="form-control" id="inputLastName" placeholder="Last Name"/>
          </div>
        </div>
        <div id="emailDiv" className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input name="email" type="email" className="form-control" id="inputEmail" placeholder="Email"/>
            <div className="form-control-feedback" id="usernameFeedback" style={{display: 'none'}}>
              username already exists
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input name="password" type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
          </div>
        </div>
        <fieldset className="form-group row">
          <legend className="col-form-legend col-sm-2">Gender</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="male"/>
                Male
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="female"/>
                Female
              </label>
            </div>
          </div>
        </fieldset>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-block btn-danger">Sign Up</button>
                      </div>
                    </div>
                  </form>
                </div>
  );
};

SignUp.propTypes = {
  signUp: PropTypes.func
};


export default SignUp;
