import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(url).then(anecdote=>anecdote.data)

export const createAnecdote = (anecdote) => axios.post(url,anecdote).then(res=>res.data)