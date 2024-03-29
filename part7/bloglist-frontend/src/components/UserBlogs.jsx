import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
    <div>
      <h2>{userBlogList[0].user.username}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {userBlogList.map((blog) => (
          <li key={blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
