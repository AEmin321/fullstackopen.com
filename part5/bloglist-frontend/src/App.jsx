import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [notification,setNotification] = useState(null)

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

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

  const handleCreateBlog = async(event)=> {
    event.preventDefault()
    try {
      const newBlog = {
        title:title,
        author:author,
        url:url
      }
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
    setTitle('')
    setAuthor('')
    setUrl('')
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
    <form onSubmit={handleCreateBlog}>
      <Notification message={notification}/>
      <h2>Create new Blog</h2>
      <div><label htmlFor="Title">Title:<input type="text" value={title} onChange={({target})=>setTitle(target.value)}/></label></div>
      <div><label htmlFor="Author">Author:<input type="text" value={author} onChange={({target})=>setAuthor(target.value)}/></label></div>
      <div><label htmlFor="Url">URL:<input type="text" value={url} onChange={({target})=>setUrl(target.value)}/></label></div>
      <button type='submit'>Save</button>
    </form>
  )

  return (
    <div>
      {!user && login()}
      {user && <div><p>{user.name} is logged in</p><div>{createBlog()}</div>{renderBlogs()} <button onClick={handleLogout}>logout</button></div>}
    </div>
  )
}

export default App