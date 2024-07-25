/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Chats = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-id': process.env.REACT_APP_CHATENGINE_PROJECT_ID,
          'user-name': user.email,
          'user-secret': user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name);

          axios
            .post('https://api.chatengine.io/users', formdata, {
              headers: { 'private-key': process.env.REACT_APP_CHATENGINE_PRIVATE_KEY },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, navigate]);

  if (!user || loading) return 'Loading...';

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>ChatterBox</div>
        <div onClick={logout} className='logout-tab'>
          Logout
        </div>
      </div>

      <ChatEngine
        height='calc(100vh - 66px)'
        projectID={process.env.REACT_APP_CHATENGINE_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;

const getFile = async (url) => {
  const response = await fetch(url);
  const data = await response.blob();
  const filename = url.split('/').pop();
  return new File([data], filename, { type: data.type });
};
