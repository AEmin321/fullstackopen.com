import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)

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
    }
  }, [])

  const handleLogin = async (event)=>{
    event.preventDefault()
    try {
      const user = await loginService.login({username:username,password:password})
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUserName('')
      setPassword('')
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const login = () => (
    <div>
      <h2>login to application</h2>
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

  return (
    <div>
      {!user && login()}
      {user && <div>{user.name} is logged in {renderBlogs()} <button onClick={handleLogout}>logout</button></div>}
    </div>
  )
}

export default App