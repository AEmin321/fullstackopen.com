import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'



test('testing for author and title',() => {
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

  render(<Blog blog={blog} user={user}/>)
  const renderedText = screen.getByText('sampleblog - mahmut')
  expect(renderedText).toBeDefined()
})