import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, name, handleLikes }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleDelete = async () => {

    if (window.confirm(`delete blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog)
      const newBlogs = blogs.filter(oldBlog => oldBlog.id !== blog.id)
      setBlogs(newBlogs)
    }

  }

  if (blog.user.name === name) {
    return (
      <div>
        <div style={hideWhenVisible} className='show' data-testid='blog'>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible} className='hide'>
          <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
          <div>{blog.url}</div>
          <div data-testid='likes'>{blog.likes} <button onClick={() => handleLikes(blog)}>like</button><button onClick={handleDelete}>remove</button></div>
          <div>{blog.user.name}</div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <div style={hideWhenVisible} className='unowned' data-testid='blog'>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
          <div>{blog.url}</div>
          <div data-testid='likes'>{blog.likes} <button onClick={() => handleLikes(blog)}>like</button></div>
          <div>{blog.user.name}</div>
        </div>
      </div>
    )
  }
}

export default Blog