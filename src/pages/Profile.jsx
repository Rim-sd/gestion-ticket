import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
  Divider,
  Stack,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
  });

  // Simulated user data - In a real app, this would come from an API or context
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    department: 'IT Security',
    role: 'Security Analyst',
    lastLogin: '2024-03-20 14:30',
  };

  useEffect(() => {
    // In a real app, you would fetch user data here
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      department: userData.department,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Form submitted:', formData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                mb: 2,
              }}
            >
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              {userData.role}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Dernière connexion: {userData.lastLogin}
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Typography variant="h5" gutterBottom sx={{ mb: 3 }} align="center">
            Informations du profil
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Prénom"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Nom"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Téléphone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Département"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                Enregistrer les modifications
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 