import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  BugReport as BugIcon,
  CheckCircle as CheckIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ color, mr: 1 }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  // This would be replaced with actual data from your backend
  const stats = {
    totalUsers: 150,
    totalIncidents: 324,
    resolvedIncidents: 289,
    pendingIncidents: 35,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={PeopleIcon}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Incidents"
            value={stats.totalIncidents}
            icon={BugIcon}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Resolved"
            value={stats.resolvedIncidents}
            icon={CheckIcon}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={stats.pendingIncidents}
            icon={PendingIcon}
            color="#ed6c02"
          />
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Recent Activity
            </Typography>
            {/* Add your activity list component here */}
          </Paper>
        </Grid>

        {/* System Health */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              System Health
            </Typography>
            {/* Add system health metrics here */}
          </Paper>
        </Grid>

        {/* User Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              User Distribution
            </Typography>
            {/* Add user distribution chart here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 