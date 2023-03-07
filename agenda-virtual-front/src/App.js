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

import Dashboard from './pages/usersPages/Dashboard';
import SchedulesPage from './pages/usersPages/Dashboard/SchedulesPage';
import ToSchedulePage from './pages/usersPages/Dashboard/ToSchedule';
import HistoryPage from './pages/usersPages/Dashboard/HistoryPage';
import WaitingPage from './pages/usersPages/Dashboard/WaitingPage';

import DashboardClient from './pages/clientsPages/DashboardClient';
import ClientSchedulesPage from './pages/clientsPages/DashboardClient/SchedulesPage';
import ScheduleClient from './pages/clientsPages/DashboardClient/ToSchedule';
import ClientHistory from './pages/clientsPages/DashboardClient/HistoryPage';
import ProfilePage from './pages/clientsPages/DashboardClient/ProfilePage';

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
            <Route path='/dashboardclient' element={<><DashboardClient /></>}>
              <Route index path="*" element={<Navigate to="/dashboardclient/waiting" />} />
              <Route path='schedules' element={<ClientSchedulesPage />} />
              <Route path='toSchedule' element={<ScheduleClient />} />
              <Route path='history' element={<ClientHistory />} />
              <Route path='waiting' element={<ProfilePage />} />
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
