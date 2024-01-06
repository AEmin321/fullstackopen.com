import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog /> Tests',() => {
  const blog = {
    title:'sampleblog',
    author:'mahmut',
    url:'https/:newomoo/com/slj',
    likes:34
  }
  const user = {
    name:'random',
    username:'random2'
  }
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container
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
