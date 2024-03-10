import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('blog renders correctly', () => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'www.google.com',
    likes: 0,
    user: {
      name: 'John Smith',
      username: 'root',
      id: '123456'
    },
    id: '123456'
  }

  const blogs = [blog, blog, blog]

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} blogs={blogs} name='John Smith' setBlogs={mockHandler}/>)

  let element = container.querySelector('.show')
  expect(element).toHaveStyle('display: block')
  element = container.querySelector('.hide')
  expect(element).toHaveStyle('display: none')
})

test('blog click view', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'www.google.com',
    likes: 0,
    user: {
      name: 'John Smith',
      username: 'root',
      id: '123456'
    },
    id: '123456'
  }

  const blogs = [blog, blog, blog]

  const mockHandlerOne = vi.fn()
  const mockHandlerTwo = vi.fn()

  const { container } = render(<Blog blog={blog} blogs={blogs} name='John Smith' setBlogs={mockHandlerOne} handleLikes={mockHandlerTwo}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  let element = container.querySelector('.show')
  expect(element).toHaveStyle('display: none')
  element = container.querySelector('.hide')
  expect(element).toHaveStyle('display: block')
})

test('blog click twice', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'www.google.com',
    likes: 0,
    user: {
      name: 'John Smith',
      username: 'root',
      id: '123456'
    },
    id: '123456'
  }

  const blogs = [blog, blog, blog]

  const mockHandlerOne = vi.fn()
  const mockHandlerTwo = vi.fn()

  render(<Blog blog={blog} blogs={blogs} name='John Smith' setBlogs={mockHandlerOne} handleLikes={mockHandlerTwo}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandlerTwo.mock.calls).toHaveLength(2)
})

test('blog form submit', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'www.google.com',
    likes: 0,
    user: {
      name: 'John Smith',
      username: 'root',
      id: '123456'
    },
    id: '123456'
  }

  const blogs = [blog, blog, blog]

  const mockHandlerOne = vi.fn()
  const mockHandlerTwo = vi.fn()
  const mockHandlerThree = vi.fn()
  const mockHandlerFour = vi.fn()

  const { container } = render(<BlogForm blogs={blogs} setBlogs={mockHandlerOne} setErrorMessage={mockHandlerTwo} toggleVisibility={mockHandlerThree} createBlog={mockHandlerFour}/>)


  const inputs = screen.getAllByRole('textbox')

  const inputOne = inputs[0]
  const inputTwo = inputs[1]
  const inputThree = inputs[2]

  const user = userEvent.setup()
  const button = screen.getByText('create')

  await user.type(inputOne, 'Test Blog')
  await user.type(inputTwo, 'John Doe')
  await user.type(inputThree, 'www.google.com')
  await user.click(button)

  expect(mockHandlerFour.mock.calls).toHaveLength(1)
  expect(mockHandlerFour.mock.calls[0][0].title).toBe('Test Blog')
  expect(mockHandlerFour.mock.calls[0][0].author).toBe('John Doe')
  expect(mockHandlerFour.mock.calls[0][0].url).toBe('www.google.com')
})