import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    if (files) {
      formData.append('file', files[0]); // Assuming only one file is selected
    }

    fetch('http://localhost:5000/post', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          console.log('Post created successfully:', response);
          setRedirect(true);
        }
        return response.json(); // Parse response body as JSON
      })
      .then(data => {
        // Handle data if needed
        console.log('Response data:', data);
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Add Blog Title' value={title} onChange={handleTitleChange} />
        <input type='text' placeholder='Add Summary' value={summary} onChange={handleSummaryChange} />
        <input type='file' onChange={event => setFiles(event.target.files)} />
        <ReactQuill value={content} onChange={handleContentChange} modules={modules} formats={formats} />
        <button style={{ marginTop: '5px' }} type='submit'>Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
