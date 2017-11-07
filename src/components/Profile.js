import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
  console.log(props.user);
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object
};

export default Profile;
