import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBlog from "./CreateBlog";
import { Link } from "react-router-dom";
import { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import BlogForm from "./BlogForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RenderBlogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Fab
        sx={{ position: "fixed", bottom: "3rem", right: "3rem" }}
        color="primary"
        variant="extended"
        onClick={() => setOpen(true)}
      >
        <EditIcon sx={{ mr: 1 }} />
        Create New Blog
      </Fab>
      <Typography m="1.4rem 0 1rem 0" variant="h3" gutterBottom>
        Blogs
      </Typography>
      <Divider />
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar elevation={0} sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cteate New Blog
            </Typography>
          </Toolbar>
        </AppBar>
        <BlogForm />
      </Dialog>
      <List>
        {blogs &&
          [...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${blog._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton>
                  <ListItemText primary={blog.title} secondary={blog.author} />
                </ListItemButton>
              </Link>
            ))}
      </List>
    </Container>
  );
};

export default RenderBlogs;
