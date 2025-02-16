import { useContext } from 'react';
import { ExchangeContext } from '../context/ExchangeContext';
import { Typography, Box, Button } from '@mui/material';

const ExchangeRate = () => {
  const { state, dispatch } = useContext(ExchangeContext)!;

  const toggleFixedRate = () => {
    if (state.fixedRate === null) {
      dispatch({ type: 'FIX_RATE' });
    } else {
      dispatch({ type: 'UNFIX_RATE' });
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 3 }}>
      <Typography variant="h4">Taux de Change Actuel</Typography>
      <Typography variant="h5" color={state.fixedRate !== null ? 'secondary' : 'primary'}>
        {state.exchangeRate.toFixed(4)} EUR/USD
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={toggleFixedRate}>
        {state.fixedRate !== null ? 'Désactiver le Taux Fixe' : 'Fixer le Taux'}
      </Button>
    </Box>
  );
};

export default ExchangeRate;
