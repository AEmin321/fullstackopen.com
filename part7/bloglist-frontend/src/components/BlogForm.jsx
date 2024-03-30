import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../slices/blogsSlice";
import { useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const addToBlog = (event) => {
    event.preventDefault();
    dispatch(addBlog({ title: title, author: user.name, url: url }));
    setTitle("");
    setUrl("");
  };

  return (
    <Container>
      <form onSubmit={addToBlog}>
        <div>
          <TextField
            fullWidth
            id="standard-multiline-flexible"
            label="Title"
            value={title}
            multiline
            maxRows={4}
            variant="standard"
            onChange={({ target }) => setTitle(target.value)}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="standard-multiline-flexible"
            label="Author"
            multiline
            maxRows={4}
            variant="standard"
            value={user.name}
            margin="normal"
            disabled
          />
        </div>
        <div>
          <TextField
            margin="normal"
            fullWidth
            id="standard-multiline-static"
            label="URL"
            multiline
            rows={4}
            variant="standard"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Box my="1rem">
          <Button type="submit" variant="contained" fullWidth disableElevation>
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default BlogForm;
