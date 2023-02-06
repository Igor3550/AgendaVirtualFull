import { QueryClientProvider, QueryClient } from 'react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SchedulesPage from './pages/Dashboard/SchedulesPage';
import ToSchedulePage from './pages/Dashboard/ToSchedule';
import HistoryPage from './pages/Dashboard/HistoryPage';
import WaitingPage from './pages/Dashboard/WaitingPage';

import { WaitingProvider } from './contexts/WaitingContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>

      <WaitingProvider>
        <Router>
          <Routes>
            <Route path='/' element={<><Dashboard /></>}>
              <Route index path="/*" element={<Navigate to="/" />} />
              <Route path='/' element={<SchedulesPage />} />
              <Route path='toSchedule' element={<ToSchedulePage />} />
              <Route path='history' element={<HistoryPage />} />
              <Route path='waiting' element={<WaitingPage />} />
            </Route>
          </Routes>
        </Router>
      </WaitingProvider>

    </QueryClientProvider>
    </>
  );
}

export default App;
