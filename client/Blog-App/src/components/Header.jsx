import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext';

function Header() {
  const [error, setError] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserContext); 

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user info');
      })
      .then(userInfo => {
        setUserInfo(userInfo); 
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info');
      });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          setUserInfo(null); 
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
        setError('Failed to logout');
      });
  }

  return (
    <div>
      <header>
        <Link to='/' className='Logo'>
          MyBlog
        </Link>
        <nav>
          {error || !userInfo ? (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          ) : (
            <>
              <Link to='/create'>Add Post</Link>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
