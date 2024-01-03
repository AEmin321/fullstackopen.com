import { useState } from "react"

const BlogForm = ({notification,createBlog}) => {
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')

    const addBlog = (event)=> {
        event.preventDefault()
        createBlog({title:title,author:author,url:url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <Notification message={notification}/>
                <h2>Create new Blog</h2>
                <div><label htmlFor="Title">Title:<input type="text" value={title} onChange={({target})=>setTitle(target.value)}/></label></div>
                <div><label htmlFor="Author">Author:<input type="text" value={author} onChange={({target})=>setAuthor(target.value)}/></label></div>
                <div><label htmlFor="Url">URL:<input type="text" value={url} onChange={({target})=>setUrl(target.value)}/></label></div>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default BlogForm