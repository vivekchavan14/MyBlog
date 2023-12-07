import React, { useState } from 'react'

function Register() {
  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');

 function register(event){
   event.preventDefault();
   fetch('http://localhost:5000/register',{
     method: 'POST',
     body: JSON.stringify({username, password}),
     headers: {'Content-Type': 'application/json' },
   })
 }

  return (
    <div>
          <form className='register' onSubmit={register}>
            <h1>Register</h1>
            <input type='text' placeholder='Username' value={username} onChange={event => setUsername(event.target.value)}/>
            <input type='text' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)}/>
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register
