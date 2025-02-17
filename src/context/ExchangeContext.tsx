import { createContext, useReducer, ReactNode, useEffect, useRef, useCallback } from 'react';

type State = {
  exchangeRate: number;
  fixedRate: number | null;
  history: Conversion[];
};

type Conversion = {
  date: string;
  from: string;
  to: string;
  rate: number;
  amount: number;
  result: number;
  mode: string;
};

type Action =
  | { type: 'SET_RATE'; payload: number }
  | { type: 'FIX_RATE' }
  | { type: 'UNFIX_RATE' }
  | { type: 'ADD_HISTORY'; payload: Conversion };

const initialState: State = {
  exchangeRate: 1.1,
  fixedRate: null,
  history: [],
};

const exchangeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_RATE':
      if (state.fixedRate !== null) return state;
      return { ...state, exchangeRate: action.payload };

    case 'FIX_RATE':
      return { ...state, fixedRate: state.exchangeRate };

    case 'UNFIX_RATE':
      return { ...state, fixedRate: null };

    case 'ADD_HISTORY':
      return { ...state, history: [action.payload, ...state.history].slice(0, 5) };

    default:
      return state;
  }
};

export const ExchangeContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const ExchangeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(exchangeReducer, initialState);

  const exchangeRateRef = useRef(state.exchangeRate);

  useEffect(() => {
    exchangeRateRef.current = state.exchangeRate;
  }, [state.exchangeRate]);

  const updateRate = useCallback(() => {
    if (state.fixedRate === null) {
      const randomChange = (Math.random() * 0.1 - 0.05).toFixed(4);
      dispatch({ type: 'SET_RATE', payload: exchangeRateRef.current + parseFloat(randomChange) });
    }
  }, [state.fixedRate]);

  useEffect(() => {
    const interval = setInterval(updateRate, 3000);
    return () => clearInterval(interval);
  }, [updateRate]);

  return <ExchangeContext.Provider value={{ state, dispatch }}>{children}</ExchangeContext.Provider>;
};
