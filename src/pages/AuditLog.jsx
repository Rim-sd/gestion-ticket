import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// Données fictives pour la démonstration
const mockAuditLogs = [
  {
    id: 1,
    date: '2024-03-30 14:30',
    utilisateur: 'Jean Dupont',
    action: 'Modification incident',
    details: 'Mise à jour du statut de l\'incident #123',
    categorie: 'Incident',
  },
  {
    id: 2,
    date: '2024-03-30 11:15',
    utilisateur: 'Marie Martin',
    action: 'Création plan',
    details: 'Création d\'un nouveau plan de continuité',
    categorie: 'Plan de continuité',
  },
  {
    id: 3,
    date: '2024-03-29 16:45',
    utilisateur: 'Pierre Durand',
    action: 'Suppression document',
    details: 'Suppression de l\'ancien guide utilisateur',
    categorie: 'Documentation',
  },
];

function AuditLog() {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [categorie, setCategorie] = useState('');
  const [utilisateur, setUtilisateur] = useState('');

  const getActionColor = (categorie) => {
    switch (categorie.toLowerCase()) {
      case 'incident':
        return 'error';
      case 'plan de continuité':
        return 'primary';
      case 'documentation':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          📑 Journal d'audit
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Suivi des actions des utilisateurs et traçabilité des modifications
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Date début"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Date fin"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Catégorie</InputLabel>
              <Select
                value={categorie}
                label="Catégorie"
                onChange={(e) => setCategorie(e.target.value)}
              >
                <MenuItem value="">Toutes</MenuItem>
                <MenuItem value="incident">Incident</MenuItem>
                <MenuItem value="plan">Plan de continuité</MenuItem>
                <MenuItem value="documentation">Documentation</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Utilisateur"
              value={utilisateur}
              onChange={(e) => setUtilisateur(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Détails</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAuditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.utilisateur}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>
                  <Chip
                    label={log.categorie}
                    color={getActionColor(log.categorie)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AuditLog; 