import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const data = useSelector((state) => state.blogs);

  const userBlogCounts = data.reduce((counts, blog) => {
    const userID = blog.user.id;
    const userName = blog.user.username;

    if (!counts[userName]) {
      counts[userName] = { id: userID, count: 0 };
    }

    counts[userName].count++;
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
          {Object.entries(userBlogCounts).map(([user, { id, count }]) => (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{user}</Link>
              </td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
