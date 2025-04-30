import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Card,
  CardContent,
  Fade,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from '@mui/icons-material';

function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      setIncident({
        id: id,
        titre: 'Panne serveur principal',
        description: 'Le serveur principal a rencontré une panne critique nécessitant une intervention immédiate.',
        type: 'Système',
        gravite: 'Critique',
        service: 'IT',
        date: '2024-03-15',
        statut: 'En cours',
        responsable: 'Jean Dupont',
        historique: [
          {
            date: '2024-03-15 09:00',
            action: 'Incident déclaré',
            utilisateur: 'Marie Martin',
          },
          {
            date: '2024-03-15 09:15',
            action: 'Équipe technique notifiée',
            utilisateur: 'Système',
          },
          {
            date: '2024-03-15 09:30',
            action: 'Début de l\'intervention',
            utilisateur: 'Jean Dupont',
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const getGraviteColor = (gravite) => {
    switch (gravite?.toLowerCase()) {
      case 'critique':
        return 'error';
      case 'élevé':
        return 'warning';
      case 'moyen':
        return 'info';
      case 'faible':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (statut) => {
    switch (statut?.toLowerCase()) {
      case 'résolu':
        return 'success';
      case 'en cours':
        return 'warning';
      case 'critique':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={true} timeout={500}>
        <div>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/incidents')}
              sx={{ mr: 2 }}
            >
              Retour
            </Button>
            <Typography variant="h4" component="h1" sx={{ flex: 1 }}>
              Détails de l'incident
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card elevation={3} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                      {incident.titre}
                    </Typography>
                    <Box>
                      <Chip
                        label={incident.gravite}
                        color={getGraviteColor(incident.gravite)}
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={incident.statut}
                        color={getStatusColor(incident.statut)}
                      />
                    </Box>
                  </Box>

                  <Typography variant="body1" paragraph>
                    {incident.description}
                  </Typography>

                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Type: {incident.type}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Date: {incident.date}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Responsable: {incident.responsable}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Historique des actions
                  </Typography>
                  <List>
                    {incident.historique.map((action, index) => (
                      <div key={index}>
                        <ListItem>
                          <ListItemIcon>
                            <FiberManualRecordIcon color={index === 0 ? 'primary' : 'disabled'} fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={action.action}
                            secondary={
                              <>
                                <Typography variant="caption" color="primary">
                                  {action.date}
                                </Typography>
                                <br />
                                <Typography variant="caption" color="text.secondary">
                                  Par {action.utilisateur}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        {index < incident.historique.length - 1 && <Divider variant="inset" component="li" />}
                      </div>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/incidents/${id}/modifier`)}
                      fullWidth
                    >
                      Modifier l'incident
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      fullWidth
                    >
                      Marquer comme résolu
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<WarningIcon />}
                      fullWidth
                    >
                      Mettre à jour le statut
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Container>
  );
}

export default IncidentDetails; 