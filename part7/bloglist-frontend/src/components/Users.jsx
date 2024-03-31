import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Users = () => {
  const data = useSelector((state) => state.blogs);
  console.log(data);

  let userBlogCounts = {};
  if (data && data.length > 0) {
    userBlogCounts = data.reduce((counts, blog) => {
      const userID = blog.user && blog.user.id;
      console.log(userID);
      const userName = blog.user && blog.user.username;
      console.log(userName);
      if (userID && userName) {
        if (!counts[userName]) {
          counts[userName] = { id: userID, count: 0 };
        }
        counts[userName].count++;
      }
      return counts;
    }, {});
  } else {
    console.log("No blogs data available.");
  }

  console.log(userBlogCounts);

  return (
    <Container>
      <Typography m="1.4rem 0 1rem 0" variant="h3" gutterBottom>
        Users
      </Typography>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(userBlogCounts).map(([user, { id, count }]) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell key={user} component="th" scope="row">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/users/${id}`}
                  >
                    {user}
                  </Link>
                </TableCell>
                <TableCell key={count} align="right">
                  {count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
