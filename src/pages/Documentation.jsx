import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Description as DescriptionIcon,
  Download as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
  Book as BookIcon,
  Security as SecurityIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

// Données fictives pour la démonstration
const mockDocuments = {
  'Gestion de Crise': [
    {
      id: 1,
      titre: 'Plan de Gestion de Crise',
      description: 'Procédures détaillées pour la gestion des crises majeures',
      type: 'PDF',
      date: '2024-03-15',
      categorie: 'Procédure',
    },
    {
      id: 2,
      titre: 'Guide ISO 22301',
      description: 'Guide d\'implémentation de la norme ISO 22301',
      type: 'PDF',
      date: '2024-03-10',
      categorie: 'Guide',
    },
  ],
  'Procédures Internes': [
    {
      id: 3,
      titre: 'Procédure de Déclaration d\'Incident',
      description: 'Étapes à suivre pour déclarer un incident',
      type: 'PDF',
      date: '2024-03-20',
      categorie: 'Procédure',
    },
    {
      id: 4,
      titre: 'Politique de Continuité d\'Activité',
      description: 'Politique générale de continuité d\'activité',
      type: 'PDF',
      date: '2024-03-18',
      categorie: 'Politique',
    },
  ],
  'Guides Utilisateurs': [
    {
      id: 5,
      titre: 'Guide Utilisateur - Gestion des Incidents',
      description: 'Manuel d\'utilisation du module de gestion des incidents',
      type: 'PDF',
      date: '2024-03-25',
      categorie: 'Guide',
    },
  ],
};

function Documentation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState('');

  const handleSectionChange = (section) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const getDocumentIcon = (categorie) => {
    switch (categorie.toLowerCase()) {
      case 'procédure':
        return <AssignmentIcon />;
      case 'guide':
        return <BookIcon />;
      case 'politique':
        return <SecurityIcon />;
      default:
        return <DescriptionIcon />;
    }
  };

  const getCategorieColor = (categorie) => {
    switch (categorie.toLowerCase()) {
      case 'procédure':
        return 'primary';
      case 'guide':
        return 'info';
      case 'politique':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          📚 Centre de Documentation
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Politiques, procédures et guides pour la gestion de crise et la continuité d'activité
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Rechercher un document..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {Object.entries(mockDocuments).map(([section, documents]) => (
        <Accordion
          key={section}
          expanded={expandedSection === section}
          onChange={() => handleSectionChange(section)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{section}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {documents.map((doc, index) => (
                <div key={doc.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemIcon>
                      {getDocumentIcon(doc.categorie)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {doc.titre}
                          <Chip
                            label={doc.categorie}
                            size="small"
                            color={getCategorieColor(doc.categorie)}
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          {doc.description}
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            Mis à jour le {doc.date}
                          </Typography>
                        </>
                      }
                    />
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      Télécharger
                    </Button>
                  </ListItem>
                </div>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Section spéciale ISO 22301 */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          🏆 Conformité ISO 22301
        </Typography>
        <Typography variant="body1" paragraph>
          Notre système de gestion de la continuité d'activité est conforme à la norme ISO 22301:2019,
          qui définit les exigences pour la planification, l'établissement, la mise en œuvre, 
          l'exploitation, la surveillance, la revue, la maintenance et l'amélioration continue d'un 
          système de management documenté pour se protéger des incidents perturbateurs, les réduire, 
          y répondre et s'en remettre.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{ mr: 2 }}
          >
            Guide d'implémentation ISO 22301
          </Button>
          <Button
            variant="outlined"
            startIcon={<DescriptionIcon />}
          >
            Politique de conformité
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Documentation; 