import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await axios.get(url)
    return response.data
}

const createAnecdote = async (content) => {
    const data = { content:content, votes:0 }
    const response = await axios.post(url,data)
    return response.data
}

export default { getAnecdotes, createAnecdote }