import axios from 'axios'

export const getAnecdotes = () => axios.get('http://localhost:3001/anecdotes').then(anecdote=>anecdote.data)