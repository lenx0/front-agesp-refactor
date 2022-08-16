import { React, useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://aggesp-api.altogiro.net/v1/agesp/vacancy/list")
      .then((resp) => {
        console.log(resp);
        setData(resp);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.vacancyDateOpen}>
              <TableCell component="th" scope="row">
                {row.replacedEmployee}
              </TableCell>
              <TableCell align="right">{row.requesterName}</TableCell>
              <TableCell align="right">{row.manager}</TableCell>
              <TableCell align="right">{row.responsible}</TableCell>
              <TableCell align="right">{row.hiringReason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
