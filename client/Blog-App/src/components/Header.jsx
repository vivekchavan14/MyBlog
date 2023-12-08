import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      method: 'GET', // Specify the HTTP method
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user info');
      })
      .then(userInfo => {
        setUsername(userInfo.username);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info'); // Set the error state
      });
  }, []); 

  return (
    <div>
      <header>
        <Link to='/' className='Logo'>MyBlog</Link>
        <nav>
          {error || !username ? ( // If there's an error or no username, show login and register
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          ) : (
            <> {/* If username exists, show Add Post and Logout */}
              <Link to="/create">Add Post</Link>
              <Link to="/logout">Logout</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
