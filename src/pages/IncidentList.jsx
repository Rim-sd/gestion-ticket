import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

// Données fictives pour la démonstration
const mockIncidents = [
  {
    id: 1,
    titre: 'Panne serveur principal',
    type: 'Système',
    gravite: 'Critique',
    date: '2024-03-15',
    statut: 'En cours',
    responsable: 'Jean Dupont',
  },
  {
    id: 2,
    titre: 'Problème réseau',
    type: 'Réseau',
    gravite: 'Moyen',
    date: '2024-03-14',
    statut: 'Résolu',
    responsable: 'Marie Martin',
  },
  {
    id: 3,
    titre: 'Erreur base de données',
    type: 'Base de données',
    gravite: 'Élevé',
    date: '2024-03-13',
    statut: 'En cours',
    responsable: 'Pierre Durand',
  },
];

function IncidentList() {
  const navigate = useNavigate();
  const [incidents] = useState(mockIncidents);

  const getGraviteColor = (gravite) => {
    switch (gravite.toLowerCase()) {
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
    switch (statut.toLowerCase()) {
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

  return (
    <Container maxWidth="lg">
      <Fade in={true} timeout={500}>
        <div>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              Liste des Incidents
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/incidents/nouveau')}
              sx={{
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                },
              }}
            >
              Nouvel Incident
            </Button>
          </Box>

          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titre</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Gravité</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Responsable</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow
                    key={incident.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <TableCell>{incident.titre}</TableCell>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={incident.gravite}
                        color={getGraviteColor(incident.gravite)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{incident.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={incident.statut}
                        color={getStatusColor(incident.statut)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{incident.responsable}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Voir les détails">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/incidents/${incident.id}`)}
                          sx={{ color: 'primary.main' }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/incidents/${incident.id}/modifier`)}
                          sx={{ color: 'primary.main', ml: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Fade>
    </Container>
  );
}

export default IncidentList; 