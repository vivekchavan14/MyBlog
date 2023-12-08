import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import { UserContextProvider } from './components/userContext'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <UserContextProvider>
      <main>
        <Header />
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
        </Routes>
      </main>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
