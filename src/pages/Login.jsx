import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Grid,
  useTheme,
} from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';

// Static users database
const USERS = [
  {
    email: 'admin@admin.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
  },
  {
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    name: 'Regular User',
  },
];

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('Attempting login with:', credentials);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = USERS.find(
        u => u.email.toLowerCase() === credentials.email.toLowerCase() && 
             u.password === credentials.password
      );

      console.log('Found user:', user);

      if (user) {
        // Store user data in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        
        console.log('Login successful, redirecting to dashboard...');
        // Force a page reload to ensure all components re-render with new auth state
        window.location.href = '/dashboard';
      } else {
        console.log('Login failed: Invalid credentials');
        setError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Section gauche avec l'image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <img
                src="/security.svg"
                alt="Sécurité"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  marginBottom: '2rem',
                }}
              />
              <Typography variant="h4" sx={{ mb: 2 }}>
                Système de Gestion des Incidents
              </Typography>
              <Typography variant="body1">
                Plateforme sécurisée pour la gestion et le suivi des incidents
              </Typography>
            </Box>
          </Grid>

          {/* Section droite avec le formulaire */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={24}
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    textAlign: 'center',
                    mb: 1,
                  }}
                >
                  Connexion
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={credentials.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                    },
                  }}
                >
                  {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
              </Box>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Comptes de test:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Admin: admin@admin.com / admin123
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  User: user@example.com / user123
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login; 