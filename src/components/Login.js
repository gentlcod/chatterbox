/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { auth, facebookProvider, googleProvider } from '../firebase';
import { signInWithPopup, getRedirectResult, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logoImg from '../logo.png';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [retry, setRetry] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log(result.user);
          navigate('/chats');
        }
      } catch (error) {
        handleAuthError(error);
      }
    };

    handleRedirectResult();
  }, [navigate]);

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
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
    console.error('Authentication Error:', error);

    if (error.code === 'auth/account-exists-with-different-credential') {
      await handleAccountExistsError(error);
    } else if (error.code === 'auth/popup-closed-by-user') {
      setErrorMessage('The sign-in popup was closed before completing the sign-in.');
      setRetry(true);
    } else {
      setErrorMessage('Authentication failed. Please try again.');
    }
  };

  const handleAccountExistsError = async (error) => {
    const pendingCred = error.credential;
    const email = error.customData.email;
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    if (signInMethods.length > 0) {
      const providerId = signInMethods[0];
      let provider;

      switch (providerId) {
        case 'password':
          provider = EmailAuthProvider;
          break;
        case 'google.com':
          provider = googleProvider;
          break;
        case 'facebook.com':
          provider = facebookProvider;
          break;
        default:
          console.error('Unsupported provider:', providerId);
          setErrorMessage('Unsupported sign-in provider.');
          return;
      }

      try {
        const result = await signInWithPopup(auth, provider);
        await linkWithCredential(result.user, pendingCred);
        console.log('Account linked successfully!');
        navigate('/chats');
      } catch (error) {
        console.error('Error linking account', error);
        setErrorMessage('Error linking accounts. Please try again.');
      }
    } else {
      setErrorMessage('No sign-in methods found for this email.');
    }
  };

  return (
    <div id='login-page'>
      <div id='login-card'>
        <img src={logoImg} alt='logo' height={50} width={50} style={{ borderRadius: '15%' }} />
        <h2>Welcome to ChatterBox!</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <br/>
        {retry ? (
          <div className='login-button google' onClick={handleGoogleLogin}>
            <GoogleOutlined />  Try Login With Google 
          </div>
        ) : (
          <>
            <div className='login-button google' onClick={handleGoogleLogin}>
              <GoogleOutlined /> Continue with Google
            </div>
            <br />
            <br />
            <div className='login-button facebook' onClick={handleFacebookLogin}>
              <FacebookOutlined /> Continue with Facebook
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
