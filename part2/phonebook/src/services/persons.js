import axios from 'axios'


const url = 'http://localhost:3002/persons'

const getData = ()=> {
    const req = axios.get(url)
    return req.then(res=>res.data)
}

const postData = (newObj)=> {
    const req = axios.post(url,newObj)
    return req.then(res=>res.data)
}

export default { getData, postData}