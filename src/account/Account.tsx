import { useAppSelector } from "../context/Hooks";
import { selectProfileData } from "../context/slices/ProfileDataSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Account() {
  const profile = useAppSelector(selectProfileData);
  var name = profile.name;
  var email = profile.email;
  var numberPlate = profile.numberPlate;

  function createData(title: string, name: string) {
    return { title, name };
  }

  const rows = [
    createData("Name", name),
    createData("E-mail", email),
    createData("Number Plate", numberPlate),
  ];

  return (
    <div>
      <h3 style={{ color: "#2e2e2e" }}>Account Info</h3>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 0, border: 1, borderColor: "#dbdbdb" }}
      >
        <Table aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    width: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.title}
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  style={{ fontSize: "16px" }}
                >
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
