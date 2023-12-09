import React, { useEffect, useState } from "react";
import Post from "./Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/post')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(postsData => {
        setPosts(postsData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        
      });
  }, []);

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => <Post key={post.id} {...post} />)
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
}
