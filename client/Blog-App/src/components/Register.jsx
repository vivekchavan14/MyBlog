import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState('');

 function register(event){
   event.preventDefault();
   fetch('http://localhost:5000/register',{
     method: 'POST',
     body: JSON.stringify({username, password}),
     headers: {'Content-Type': 'application/json' },
   }).then(response => {
    if (response.ok) {
      // Successful registration 
      alert('User registered successfully');
      setRedirect(true);
    } else {
      // Registration failed 
      alert('Registration failed');
      
    }
  })
  .catch(error => {
    console.error('Error registering user:', error);
  });
 }

 if (redirect) {
  return <Navigate to={'/login'} />; 
}


  return (
    <div>
          <form className='register' onSubmit={register}>
            <h1>Register</h1>
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
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register
