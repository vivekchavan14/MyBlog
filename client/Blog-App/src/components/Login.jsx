import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import { UserContext } from './userContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); 
  const {setUserInfo} = useContext(UserContext);

  function handleLogin(event) {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          response.json().then(userInfo => { 
            setUserInfo(userInfo)
            setRedirect(true);
          })
         
        } else {
          alert('Login failed');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        
      });
  }

  if (redirect) {
    return <Navigate to={'/'} />; // Redirect to the home page or any desired route
  }

  return (
    <div>
      <form className='login' onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <input
          type='text'
          placeholder='Password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
