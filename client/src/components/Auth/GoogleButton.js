import React from 'react';
import { GoogleLogin } from 'reac   t-google-login';

const CustomGoogleLoginButton = ({ onSuccess, onFailure }) => {
 

  const handleLoginFailure = (error) => {
    // Handle login failure here
    console.error('Google login failed:', error);
    if (onFailure) {
      onFailure(error);
    }
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy="single_host_origin"
      // You can pass any additional props that GoogleLogin accepts
    >
      {/* Render the custom-styled button */}
      <div style={customStyles}>
        Login with Google
      </div>
    </GoogleLogin>
  );
};

export default CustomGoogleLoginButton;
