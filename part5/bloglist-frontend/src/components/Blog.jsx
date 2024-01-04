import { useState } from "react"

const Blog = ({ blog , handleLike}) => {
  const [visible,setVisible] = useState(true)

  const toggleDisplay = {display:visible?'none':''}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={()=>setVisible(!visible)}>{visible?'View':'Hide'}</button>
      </div>
      <div style={toggleDisplay}>
        <br/>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.author}</div>
        <br/>
      </div>
    </div>  
  )
}

export default Blog