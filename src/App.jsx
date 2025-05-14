import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import IncidentForm from './pages/IncidentForm';
import IncidentList from './pages/IncidentList';
import IncidentDetails from './pages/IncidentDetails';
import PlanContinuite from './pages/PlanContinuite';
import Historique from './pages/Historique';
import AuditLog from './pages/AuditLog';
import Documentation from './pages/Documentation';
import Profile from './pages/Profile';
import Layout from './components/Layout';

const queryClient = new QueryClient();

// Composant pour le fond animé
const AnimatedBackground = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  if (isDashboard) {
    return (
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
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: `linear-gradient(rgba(0, 0, 32, 0.75), rgba(0, 0, 32, 0.75)), url('/assets/cyber-security-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(2px)',
        }
      }}
    />
  );
};

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isAdmin = localStorage.getItem('userRole') === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  // Admin route protection component
  const AdminRoute = ({ children }) => {
    if (!isAuthenticated || !isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AnimatedBackground />
          <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/dashboard") : "/login"} />} />
            
            {/* User Routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} replace /> : 
                <Login />
              } 
            />
            <Route
              element={isAuthenticated ? <Layout onLogout={handleLogout} isAdmin={false} /> : <Navigate to="/login" replace />}
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
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

            {/* Admin Routes */}
            <Route path="/admin/login" element={
              isAuthenticated && isAdmin ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <AdminLogin />
            } />
            <Route
              element={
                <AdminRoute>
                  <Layout onLogout={handleLogout} isAdmin={true} />
                </AdminRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/dashboard") : "/login"} replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
