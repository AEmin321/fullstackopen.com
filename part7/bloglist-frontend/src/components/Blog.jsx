import { useDispatch, useSelector } from "react-redux";
import { removeBlog, updateLike, addComment } from "../slices/blogsSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";

const Blog = ({ user }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;

  const blog = blogs.find((item) => item._id === id);
  if (!blog) {
    return null;
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    boxShadow: "none",
    color: theme.palette.text.secondary,
  }));

  return (
    <Container>
      <Typography m="2rem 0 0.5 0" variant="h3" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {blog.author}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {blog.url}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled button group"
        >
          <Button
            onClick={() => dispatch(updateLike(id))}
            endIcon={<ThumbUpIcon />}
          >
            {blog.likes}
          </Button>

          {user.name === blog.author ? (
            <Button
              id="remove-btn"
              onClick={() => dispatch(removeBlog(id))}
              endIcon={<DeleteIcon />}
              color="error"
            >
              Delete
            </Button>
          ) : (
            ""
          )}
        </ButtonGroup>
      </Box>
      <Divider sx={{ marginTop: "3rem" }} />
      <Typography m="1.4rem 0 1rem 0" variant="h6" gutterBottom>
        Comments
      </Typography>
      <Box sx={{ display: "flex", marginBottom: "2rem" }}>
        <TextField
          onChange={(event) => setComment(event.target.value)}
          id="standard-basic"
          label="Comment..."
          variant="standard"
          fullWidth
        />
        <Button
          onClick={() => dispatch(addComment(id, { text: comment }))}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        {blog.comments.map((comment) => (
          <Item key={comment._id}>{comment.text}</Item>
        ))}
      </Stack>
    </Container>
  );
};

export default Blog;
