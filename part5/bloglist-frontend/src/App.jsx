import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [notification,setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreateBlog = async(newBlog)=> {
    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))

      setNotification(`${response.title} Added.`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    } catch (error) {
      setNotification('An Error accusred.')
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const handleLogin = async (event)=>{
    event.preventDefault()
    try {
      const user = await loginService.login({username:username,password:password})
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUserName('')
      setPassword('')
      setUser(user)
    } catch (error) {
      setNotification('Wrong user name or password. try again')
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const login = () => (
    <div>
      <h2>login to application</h2>
      <Notification message={notification}/>
      <form onSubmit={handleLogin}>
        <label htmlFor="Username">Username:</label><input type="text" name='Username' value={username} onChange={({target})=>setUserName(target.value)} /><br/>
        <label htmlFor="Password">Password:</label><input type="password" name='Password' value={password} onChange={({target})=>setPassword(target.value)}/>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )

  const renderBlogs = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createBlog = ()=>(
    <div>
      <BlogForm createBlog={handleCreateBlog} notification={notification}/>
    </div>
  )

  return (
    <div>
      {!user && login()}
      {user && <div><p>{user.name} is logged in</p><div>{createBlog()}</div>{renderBlogs()} <button onClick={handleLogout}>logout</button></div>}
    </div>
  )
}

export default App