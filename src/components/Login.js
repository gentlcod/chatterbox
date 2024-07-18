import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { auth, facebookProvider, googleProvider } from '../firebase';
import { signInWithPopup, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logoImg from '../logo.png';

const Login = () => {
  const navigate = useNavigate();

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result.user);
      navigate('/chats');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      navigate('/chats');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = async (error) => {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const pendingCred = error.credential;
      const email = error.customData.email;
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        const provider = signInMethods[0] === 'password' ? EmailAuthProvider : signInMethods[0] === 'google.com' ? googleProvider : facebookProvider;

        signInWithPopup(auth, provider).then((result) => {
          return linkWithCredential(result.user, pendingCred);
        }).then(() => {
          console.log('Account linked successfully!');
          navigate('/chats');
        }).catch((error) => {
          console.error('Error linking account', error);
        });
      }
    } else {
      console.error(error);
    }
  };

  return (
    <div id='login-page'>
      <div id='login-card'>
        <img src={logoImg} alt='logo' height={50} width={50} style={{ borderRadius: '15%' }} />
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
