import { ExchangeProvider } from './context/ExchangeContext';
import Converter from './components/Converter';
import ExchangeRate from './components/ExchangeRate';
import HistoryTable from './components/HistoryTable';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from '@mui/material';

function App() {
  return (
    <ExchangeProvider>
      <Header />
      <Container>
        <ExchangeRate />
        <Converter />
        <HistoryTable />
      </Container>
      <Footer />
    </ExchangeProvider>
  );
}

export default App;
