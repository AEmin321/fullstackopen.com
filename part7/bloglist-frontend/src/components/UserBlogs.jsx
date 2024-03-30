import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

const UserBlogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;

  if (!blogs) {
    return <div>Loading the data........</div>;
  }

  const userBlogList = blogs.filter((blog) => blog.user.id === id);

  if (userBlogList.length === 0) {
    return <div>No blogs found for this user</div>;
  }

  return (
    <Container>
      <Typography m="1.4rem 0 1rem 0" variant="h3" gutterBottom>
        {userBlogList[0].user.username}
      </Typography>
      <Divider />
      <h4>Added blogs:</h4>
      <List>
        {userBlogList.map((blog) => (
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

export default UserBlogs;
