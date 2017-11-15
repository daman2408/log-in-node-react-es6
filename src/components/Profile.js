import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
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
