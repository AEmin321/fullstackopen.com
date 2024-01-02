import axios from 'axios'

const url = 'http://localhost:3002/api/login'

const login = async credential => {
    const response = await axios.post(url,credential)
    return response.data
}

export default { login }