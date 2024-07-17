import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { auth, facebookProvider, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result.user);
      // Handle successful login, navigate user or update state
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      // Handle successful login, navigate user or update state
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  return (
    <div id='login-page'>
      <div id='login-card'>
        <img 
          src='./logo.png'
          alt='logo'
          height={50}
          width={50}
          style={{ borderRadius: '15%' }}
        />
        <br />
        <br />
        <h2>Welcome to ChatterBox!</h2>

        <div className='login-button google' onClick={handleGoogleLogin}>
          <GoogleOutlined /> Continue with Google
        </div>

        <br />
        <br />

        <div className='login-button facebook' onClick={handleFacebookLogin}>
          <FacebookOutlined /> Continue with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
