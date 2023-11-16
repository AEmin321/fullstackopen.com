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

const updateData = (id,newObj)=> {
    const req = axios.put(`${url}/${id}`,newObj)
    return req.then(res=>res.data)
}

const deleteData = (id)=> {
    const req = axios.delete(`${url}/${id}`)
    return req.then(res=>res.data)
}

export default { getData, postData, deleteData, updateData}