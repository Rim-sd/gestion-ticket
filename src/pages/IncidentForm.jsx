import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
} from '@mui/material';

const niveauxGravite = [
  'Critique',
  'Élevé',
  'Moyen',
  'Faible',
];

const typesIncident = [
  'Système',
  'Réseau',
  'Base de données',
  'Application',
  'Sécurité',
  'Autre',
];

const services = [
  'IT',
  'Ressources Humaines',
  'Finance',
  'Marketing',
  'Production',
  'Autre',
];

function IncidentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: '',
    gravite: '',
    service: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation des champs
    if (!formData.titre || !formData.description || !formData.type || !formData.gravite || !formData.service) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation d'envoi des données
    console.log('Données de l\'incident:', formData);
    setSuccess(true);
    setError('');

    // Redirection après 2 secondes
    setTimeout(() => {
      navigate('/incidents');
    }, 2000);
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Déclaration d'un incident
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Incident déclaré avec succès !
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Titre de l'incident"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description détaillée"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Type d'incident</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Type d'incident"
                  onChange={handleChange}
                >
                  {typesIncident.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Niveau de gravité</InputLabel>
                <Select
                  name="gravite"
                  value={formData.gravite}
                  label="Niveau de gravité"
                  onChange={handleChange}
                >
                  {niveauxGravite.map((niveau) => (
                    <MenuItem key={niveau} value={niveau}>
                      {niveau}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Service concerné</InputLabel>
                <Select
                  name="service"
                  value={formData.service}
                  label="Service concerné"
                  onChange={handleChange}
                >
                  {services.map((service) => (
                    <MenuItem key={service} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date de l'incident"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/incidents')}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Déclarer l'incident
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default IncidentForm; 