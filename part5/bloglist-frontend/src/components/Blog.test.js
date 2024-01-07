import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
  title:'sampleblog',
  author:'mahmut',
  url:'https/:newomoo/com/slj',
  likes:34
}
const username = {
  name:'random',
  username:'random2'
}

describe('<Blog /> Tests',() => {
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} user={username} />).container
  })

  test('At the start it only shows author and title.',() => {
    const defaultBlog = container.querySelector('.defaultBlog')
    expect(defaultBlog).not.toHaveStyle('display:none')
  })

  test('After clicking the view show all the info.', async() => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const viewBlog = container.querySelector('.viewBlog')
    expect(viewBlog).not.toHaveStyle('display:none')
  })
})

test('Clicking the like button increases the like and calls event handler', async() => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} user={username} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> testing', async() => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} notification={'just a notification'} />)

  const title = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const saveButton = screen.getByText('Save')

  await user.type(title, 'thetitle')
  await user.type(authorInput,'theauthor')
  await user.type(urlInput,'theurl')
  await user.click(saveButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'thetitle',
    author: 'theauthor',
    url: 'theurl',
  })
})
