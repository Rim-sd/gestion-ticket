import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  BugReport as BugReportIcon,
  Warning as WarningIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';

// Données fictives pour le graphique
const chartData = [
  { date: '2024-03-10', incidents: 4 },
  { date: '2024-03-11', incidents: 2 },
  { date: '2024-03-12', incidents: 5 },
  { date: '2024-03-13', incidents: 3 },
  { date: '2024-03-14', incidents: 6 },
  { date: '2024-03-15', incidents: 4 },
  { date: '2024-03-16', incidents: 2 },
];

// Données fictives pour les incidents récents
const recentIncidents = [
  {
    id: 1,
    titre: 'Panne serveur principal',
    date: '2024-03-15',
    gravite: 'Critique',
    statut: 'En cours',
  },
  {
    id: 2,
    titre: 'Problème réseau',
    date: '2024-03-14',
    gravite: 'Moyen',
    statut: 'Résolu',
  },
  {
    id: 3,
    titre: 'Erreur base de données',
    date: '2024-03-13',
    gravite: 'Élevé',
    statut: 'En cours',
  },
];

function StatCard({ icon: Icon, title, value, trend, color, bgGradient }) {
  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${bgGradient[0]}, ${bgGradient[1]})`,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: 40, color: color }} />
          <Typography variant="h6" sx={{ ml: 2, color: 'white' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ mb: 1, color: 'white', fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {trend > 0 ? (
            <TrendingUpIcon sx={{ color: '#4caf50' }} />
          ) : (
            <TrendingDownIcon sx={{ color: '#f44336' }} />
          )}
          <Typography variant="body2" sx={{ ml: 1, color: trend > 0 ? '#4caf50' : '#f44336' }}>
            {Math.abs(trend)}% par rapport à la semaine dernière
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    incidentsTotal: 12,
    incidentsEnCours: 3,
    plansTotal: 5,
    testsReussis: 8,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Box className="dashboard-page" sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ 
          background: 'linear-gradient(45deg, #2196f3, #64b5f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          Tableau de bord
        </Typography>
        <Tooltip title="Rafraîchir">
          <IconButton onClick={handleRefresh} sx={{ color: 'white' }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={BugReportIcon}
            title="Incidents totaux"
            value={stats.incidentsTotal}
            trend={15}
            color="#2196f3"
            bgGradient={['rgba(33, 150, 243, 0.2)', 'rgba(33, 150, 243, 0.1)']}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={WarningIcon}
            title="En cours"
            value={stats.incidentsEnCours}
            trend={-5}
            color="#ff9800"
            bgGradient={['rgba(255, 152, 0, 0.2)', 'rgba(255, 152, 0, 0.1)']}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={SecurityIcon}
            title="Plans de continuité"
            value={stats.plansTotal}
            trend={10}
            color="#4caf50"
            bgGradient={['rgba(76, 175, 80, 0.2)', 'rgba(76, 175, 80, 0.1)']}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={CheckCircleIcon}
            title="Tests réussis"
            value={stats.testsReussis}
            trend={20}
            color="#9c27b0"
            bgGradient={['rgba(156, 39, 176, 0.2)', 'rgba(156, 39, 176, 0.1)']}
          />
        </Grid>

        {/* Graphique d'évolution */}
        <Grid item xs={12} md={8}>
          <Paper sx={{
            p: 3,
            height: '400px',
            background: 'rgba(10, 25, 41, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Évolution des incidents
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="white" />
                <YAxis stroke="white" />
                <ChartTooltip contentStyle={{ background: 'rgba(10, 25, 41, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Area type="monotone" dataKey="incidents" stroke="#2196f3" fillOpacity={1} fill="url(#colorIncidents)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Liste des incidents récents */}
        <Grid item xs={12} md={4}>
          <Paper sx={{
            p: 3,
            height: '400px',
            background: 'rgba(10, 25, 41, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Incidents récents
            </Typography>
            <Box sx={{ overflow: 'auto', height: 'calc(100% - 40px)' }}>
              {recentIncidents.map((incident) => (
                <Paper key={incident.id} sx={{
                  p: 2,
                  mb: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateX(5px)',
                  },
                }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {incident.titre}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {incident.date}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Typography variant="body2" sx={{
                        color: incident.gravite === 'Critique' ? '#f44336' : 
                               incident.gravite === 'Élevé' ? '#ff9800' : '#4caf50'
                      }}>
                        {incident.gravite}
                      </Typography>
                      <Typography variant="body2" sx={{
                        color: incident.statut === 'En cours' ? '#ff9800' : '#4caf50'
                      }}>
                        {incident.statut}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {loading && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <LinearProgress sx={{ width: '50%' }} />
        </Box>
      )}
    </Box>
  );
}

export default Dashboard; 