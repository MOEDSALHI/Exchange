import { useContext, useState } from 'react';
import { ExchangeContext } from '../context/ExchangeContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const HistoryTable = () => {
  const { state } = useContext(ExchangeContext)!;
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>De</TableCell>
            <TableCell>Vers</TableCell>
            <TableCell>Taux</TableCell>
            <TableCell>Montant</TableCell>
            <TableCell>Résultat</TableCell>
            <TableCell>Mode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.from}</TableCell>
              <TableCell>{entry.to}</TableCell>
              <TableCell>{entry.rate}</TableCell>
              <TableCell>{entry.amount}</TableCell>
              <TableCell>{entry.result}</TableCell>
              <TableCell>{state.fixedRate !== null ? 'Fixé' : 'Dynamique'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={state.history.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default HistoryTable;
