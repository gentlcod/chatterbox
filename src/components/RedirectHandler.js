// import React, { useEffect } from 'react';
// import { auth } from '../firebase';
// import { useNavigate } from 'react-router-dom';
// import { getRedirectResult } from 'firebase/auth';

// const RedirectHandler = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleRedirectResult = async () => {
//       try {
//         const result = await getRedirectResult(auth);
//         if (result.user) {
//           console.log('User signed in:', result.user);
//           navigate('/chats');  // Ensure you are navigating to the correct path
//         } else {
//           console.log('No user returned from redirect');
//         }
//       } catch (error) {
//         console.error('Redirect error:', error);
//       }
//     };

//     handleRedirectResult();
//   }, [navigate]);

//   return <div>Loading...</div>;
// };

// export default RedirectHandler;
