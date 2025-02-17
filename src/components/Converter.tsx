import { useState, useContext } from 'react';
import { ExchangeContext } from '../context/ExchangeContext';
import { Box, Button, TextField } from '@mui/material';

const Converter = () => {
  const { state, dispatch } = useContext(ExchangeContext)!;
  const [amount, setAmount] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleConvert = () => {
    if (!amount) return;

    const convertedValue =
      state.fixedRate !== null
        ? (parseFloat(amount) * state.fixedRate).toFixed(2)
        : (parseFloat(amount) * state.exchangeRate).toFixed(2);

    dispatch({
      type: 'ADD_HISTORY',
      payload: {
        date: new Date().toLocaleString(),
        from: 'EUR',
        to: 'USD',
        rate: state.fixedRate ?? state.exchangeRate,
        amount: parseFloat(amount),
        result: parseFloat(convertedValue),
        mode: state.fixedRate !== null ? 'Fixe' : 'Dynamique',
      },
    });

    setAmount('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mt: 3,
      }}
    >
      <TextField
        label="Montant en EUR"
        type="number"
        value={amount}
        onChange={handleInputChange}
        variant="outlined"
        sx={{
          width: '250px',
          height: '50px',
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleConvert}
        sx={{
          height: '50px',
          padding: '12px 20px',
        }}
      >
        Convertir
      </Button>
    </Box>
  );
};

export default Converter;
