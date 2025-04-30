import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  FileDownload as FileDownloadIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';

// Données fictives pour la démonstration
const mockHistorique = [
  {
    id: 1,
    type: 'Incident',
    titre: 'Panne serveur principal',
    date: '2024-03-15',
    service: 'IT',
    statut: 'Résolu',
    responsable: 'Jean Dupont',
  },
  {
    id: 2,
    type: 'Test PCA',
    titre: 'Test plan de reprise serveur',
    date: '2024-03-14',
    service: 'IT',
    statut: 'Réussi',
    responsable: 'Marie Martin',
  },
  {
    id: 3,
    type: 'Incident',
    titre: 'Problème réseau',
    date: '2024-03-13',
    service: 'IT',
    statut: 'Résolu',
    responsable: 'Pierre Durand',
  },
];

function Historique() {
  const [filtres, setFiltres] = useState({
    dateDebut: '',
    dateFin: '',
    type: '',
    service: '',
    statut: '',
  });
  const [historique, setHistorique] = useState(mockHistorique);

  const handleFiltreChange = (e) => {
    const { name, value } = e.target;
    setFiltres((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExport = () => {
    // Simulation d'export
    console.log('Export des données...');
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Résolu':
      case 'Réussi':
        return 'success';
      case 'En cours':
        return 'warning';
      case 'Échec':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Historique
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Date début"
              name="dateDebut"
              value={filtres.dateDebut}
              onChange={handleFiltreChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Date fin"
              name="dateFin"
              value={filtres.dateFin}
              onChange={handleFiltreChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={filtres.type}
                label="Type"
                onChange={handleFiltreChange}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="Incident">Incident</MenuItem>
                <MenuItem value="Test PCA">Test PCA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Service</InputLabel>
              <Select
                name="service"
                value={filtres.service}
                label="Service"
                onChange={handleFiltreChange}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="RH">RH</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select
                name="statut"
                value={filtres.statut}
                label="Statut"
                onChange={handleFiltreChange}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="Résolu">Résolu</MenuItem>
                <MenuItem value="En cours">En cours</MenuItem>
                <MenuItem value="Réussi">Réussi</MenuItem>
                <MenuItem value="Échec">Échec</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setFiltres({
                dateDebut: '',
                dateFin: '',
                type: '',
                service: '',
                statut: '',
              })}
            >
              Réinitialiser
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
            >
              Exporter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Responsable</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historique.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.titre}</TableCell>
                <TableCell>{item.service}</TableCell>
                <TableCell>{item.responsable}</TableCell>
                <TableCell>
                  <Chip
                    label={item.statut}
                    color={getStatusColor(item.statut)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Historique; 