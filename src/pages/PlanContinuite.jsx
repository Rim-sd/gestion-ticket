import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayArrowIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Données fictives pour la démonstration
const mockPlans = [
  {
    id: 1,
    titre: 'Plan de reprise serveur principal',
    description: 'Procédures de reprise en cas de panne du serveur principal',
    statut: 'Actif',
    derniereMiseAJour: '2024-03-15',
    prochainTest: '2024-04-15',
  },
  {
    id: 2,
    titre: 'Plan de continuité réseau',
    description: 'Procédures en cas de défaillance réseau',
    statut: 'En révision',
    derniereMiseAJour: '2024-03-10',
    prochainTest: '2024-04-10',
  },
  {
    id: 3,
    titre: 'Plan de sauvegarde données',
    description: 'Procédures de restauration des données',
    statut: 'Actif',
    derniereMiseAJour: '2024-03-01',
    prochainTest: '2024-04-01',
  },
];

function PlanContinuite() {
  const [plans, setPlans] = useState(mockPlans);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenDialog = (plan = null) => {
    setSelectedPlan(plan);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedPlan(null);
    setOpenDialog(false);
  };

  const handleDeletePlan = (planId) => {
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Actif':
        return 'success';
      case 'En révision':
        return 'warning';
      case 'Inactif':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          Plans de continuité
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nouveau plan
        </Button>
      </Box>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={6} lg={4} key={plan.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    {plan.titre}
                  </Typography>
                  <Chip
                    label={plan.statut}
                    color={getStatusColor(plan.statut)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {plan.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dernière mise à jour: {plan.derniereMiseAJour}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prochain test: {plan.prochainTest}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handleOpenDialog(plan)}
                >
                  Tester
                </Button>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleOpenDialog(plan)}
                >
                  Modifier
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeletePlan(plan.id)}
                >
                  Supprimer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedPlan ? 'Modifier le plan' : 'Nouveau plan de continuité'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Titre du plan"
                  defaultValue={selectedPlan?.titre}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  defaultValue={selectedPlan?.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Statut</InputLabel>
                  <Select
                    label="Statut"
                    defaultValue={selectedPlan?.statut || 'En révision'}
                  >
                    <MenuItem value="Actif">Actif</MenuItem>
                    <MenuItem value="En révision">En révision</MenuItem>
                    <MenuItem value="Inactif">Inactif</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date du prochain test"
                  defaultValue={selectedPlan?.prochainTest}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedPlan ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PlanContinuite; 