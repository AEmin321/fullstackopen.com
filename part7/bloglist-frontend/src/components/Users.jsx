import { useSelector } from "react-redux";

const Users = () => {
  const data = useSelector((state) => state.blogs);

  const userBlogCounts = data.reduce((counts, blog) => {
    const userName = blog.user.username;
    counts[userName] = (counts[userName] || 0) + 1;
    return counts;
  }, {});

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userBlogCounts).map(([user, count]) => (
            <tr key={user}>
              <td>{user}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
