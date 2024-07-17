/* eslint-disable no-undef */
import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const Chats = () => {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  

  console.log(user);

  const handleLogout = async() => {
    await auth.signOut();
    navigate('/');
  }

  const getFile = async (url) => {
    const response = await fetch(url)
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'})
  }

  useEffect(function() {
    if(!user) {
      navigate('/');

      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        'project-id': process.env.REACT_APP_CHATENGINE_PROJECT_ID,
        'user-name': user.email,
        'user-secret': user.uid      
      }
    }).then(function() {
      setLoading(false);
    }).catch(function() {
      let formdata = new FormData();
      formdata.append('email', user.email)
      formdata.append('username', user.email)
      formdata.append('secret', user.uid)

      getFile(user.photoURL).then(function(avatar) {
        formdata.append('avatar', avatar, avatar.name);

        axios.post('https://api.chatengine.io/users', 
          FormData,
          {headers: {'private-key' : process.env.REACT_APP_CHATENGINE_PRIVATE_KEY,}}
        ).then(() => setLoading(false)).catch((error) => console.log(error))
      })
    })
  }, [user, navigate]);

  if(!user || loading) return 'Loading...'

  return (
    <div className='chats-page'>
      
      <div className='nav-bar'>

        <div className='logo-tab'>
      ChatterBox

        </div>
        <div onClick={handleLogout} 
        className='logout-tab'>
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
  )
}

export default Chats