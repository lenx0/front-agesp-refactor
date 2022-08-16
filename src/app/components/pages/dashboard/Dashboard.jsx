import { React, useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment"

export default function BasicTable() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://aggesp-api.altogiro.net/v1/agesp/vacancy/list")
      .then((response) => response.text())
      .then((result) => {
        const parse = JSON.parse(result)
        setData(parse)
      });
  }, []);

  console.log('data', data)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Abertura</TableCell>
            <TableCell align="right">Função</TableCell>
            <TableCell align="right">Setor</TableCell>
            <TableCell align="right">Gestor</TableCell>
            <TableCell align="right">Motivo</TableCell>
            <TableCell align="right">Substituto</TableCell>
            <TableCell align="right">Salário inicial</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Admissão</TableCell>
            <TableCell align="right">Fechamento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow
              key={index}>
              <TableCell component="th" scope="row">
                {moment(row.vacancyDateOpen).format('DD.MM.YYYY')}</TableCell>
              <TableCell align="right">{row.positionOrFunction}</TableCell>
              <TableCell align="right">{row.sector}</TableCell>
              <TableCell align="right">{row.manager}</TableCell>
              <TableCell align="right">{row.responsible}</TableCell>
              <TableCell align="right">{row.hiringReason}</TableCell>
              <TableCell align="right">{row.replacedEmployee}</TableCell>
              <TableCell align="right">{row.initialSalary}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{moment(row.admissionDate).format('DD.MM.YYYY')}</TableCell>
              <TableCell align="right">{moment(row.vacancyDateClose).format('DD.MM.YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
