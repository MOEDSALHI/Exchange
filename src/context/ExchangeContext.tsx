import { createContext, useReducer, ReactNode } from 'react';

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
      if (state.fixedRate !== null) {
        return state;
      }
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
  return <ExchangeContext.Provider value={{ state, dispatch }}>{children}</ExchangeContext.Provider>;
};
