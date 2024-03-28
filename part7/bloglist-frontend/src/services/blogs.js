import axios from "axios";

const baseUrl = "http://localhost:3002/api/blogs";
let token = null;

const setToken = (theToken) => {
  token = `Bearer ${theToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateLike = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, setToken, updateLike, deleteBlog };
