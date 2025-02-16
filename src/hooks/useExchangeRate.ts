// import { useEffect, useContext } from 'react';
// import { ExchangeContext } from '../context/ExchangeContext';

// export const useExchangeRate = () => {
//   const context = useContext(ExchangeContext);
//   if (!context) throw new Error('useExchangeRate must be used within an ExchangeProvider');

//   const { state, dispatch } = context;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newRate = +(state.exchangeRate + (Math.random() * 0.1 - 0.05)).toFixed(4);
//       dispatch({ type: 'SET_RATE', payload: newRate });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [state.exchangeRate, dispatch]);

//   return { state, dispatch };
// };

import { useEffect, useContext } from 'react';
import { ExchangeContext } from '../context/ExchangeContext';

export const useExchangeRate = () => {
  const context = useContext(ExchangeContext);
  if (!context) throw new Error('useExchangeRate must be used within an ExchangeProvider');

  const { state, dispatch } = context;

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.fixedRate !== null) return;

      const newRate = +(state.exchangeRate + (Math.random() * 0.1 - 0.05)).toFixed(4);
      dispatch({ type: 'SET_RATE', payload: newRate });

      // Vérification si la variation dépasse ±2%
      if (state.fixedRate !== null && Math.abs(newRate - state.fixedRate) > state.fixedRate * 0.02) {
        dispatch({ type: 'UNFIX_RATE' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [state.exchangeRate, state.fixedRate, dispatch]);

  return { state, dispatch };
};
