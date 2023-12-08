import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); 

  function handleLogin(event) {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (response.ok) {
          alert('Login successful');
          setRedirect(true);
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
