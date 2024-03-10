import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setErrorMessage, toggleVisibility, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      const blog = await createBlog(newBlog)

      toggleVisibility()
      setBlogs(blogs.concat(blog).sort((a, b) => {
        return b.likes - a.likes
      }))
      setTitle('')
      setAuthor('')
      setUrl('')

      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
        title
          <input
            type="text"
            value={title}
            name="title"
            data-testid='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={author}
            name="author"
            data-testid='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={url}
            name="url"
            data-testid='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm