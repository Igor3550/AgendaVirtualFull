import { QueryClientProvider, QueryClient } from 'react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthenticationPage } from './pages/Authentication';
import { SingInPage } from './pages/Authentication/SignInPage';
import { SingUpPage } from './pages/Authentication/SignUpPage';

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
            <Route path='/' element={<><AuthenticationPage /></>}>
              <Route index path="/*" element={<Navigate to="/" />} />
              <Route path='/' element={<SingInPage />} />
              <Route path='signup' element={<SingUpPage />} />
            </Route>
            <Route path='/dashboard' element={<><Dashboard /></>}>
              <Route index path="*" element={<Navigate to="/dashboard/schedules" />} />
              <Route path='schedules' element={<SchedulesPage />} />
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
