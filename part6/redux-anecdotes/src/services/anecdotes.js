import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await axios.get(url)
    return response.data
}

export default { getAnecdotes }