import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import IncidentForm from './pages/IncidentForm';
import IncidentList from './pages/IncidentList';
import IncidentDetails from './pages/IncidentDetails';
import PlanContinuite from './pages/PlanContinuite';
import Historique from './pages/Historique';
import AuditLog from './pages/AuditLog';
import Documentation from './pages/Documentation';
import Layout from './components/Layout';

const queryClient = new QueryClient();

// Composant pour le fond animé
const AnimatedBackground = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: 'linear-gradient(135deg, #0a1929 0%, #1a237e 100%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("/security-pattern.svg")',
        opacity: 0.1,
        animation: 'float 20s linear infinite',
      },
      '@keyframes float': {
        '0%': {
          transform: 'translateY(0) scale(1)',
        },
        '50%': {
          transform: 'translateY(-20px) scale(1.1)',
        },
        '100%': {
          transform: 'translateY(0) scale(1)',
        },
      },
    }}
  />
);

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatedBackground />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route
              element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/incidents">
                <Route index element={<IncidentList />} />
                <Route path="nouveau" element={<IncidentForm />} />
                <Route path=":id" element={<IncidentDetails />} />
                <Route path=":id/modifier" element={<IncidentForm />} />
              </Route>
              <Route path="/plans-continuite" element={<PlanContinuite />} />
              <Route path="/audit" element={<AuditLog />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/historique" element={<Historique />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
