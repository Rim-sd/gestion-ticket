import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Fade,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  BugReport as BugReportIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  Lock as LockIcon,
  Group as GroupIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

function Layout({ onLogout, isAdmin = false }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleProfileMenuClose();
    navigate(isAdmin ? '/admin/profile' : '/profile');
  };

  const handleLogoutClick = () => {
    handleProfileMenuClose();
    onLogout();
  };

  const userMenuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Incidents', icon: <BugReportIcon />, path: '/incidents' },
    { text: 'Plans de continuité', icon: <SecurityIcon />, path: '/plans-continuite' },
    { text: 'Journal d\'audit', icon: <AssignmentIcon />, path: '/audit' },
    { text: 'Centre de documentation', icon: <BookIcon />, path: '/documentation' },
    { text: 'Historique', icon: <HistoryIcon />, path: '/historique' },
  ];

  const adminMenuItems = [
    { text: 'Tableau de bord', icon: <AdminIcon />, path: '/admin/dashboard' },
    { text: 'Gestion des utilisateurs', icon: <GroupIcon />, path: '/admin/users' },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backdropFilter: 'blur(10px)',
          background: isAdmin 
            ? 'linear-gradient(90deg, rgba(26, 35, 126, 0.9) 0%, rgba(10, 25, 41, 0.9) 100%)'
            : 'linear-gradient(90deg, rgba(10, 25, 41, 0.9) 0%, rgba(26, 35, 126, 0.9) 100%)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {isAdmin ? <AdminIcon sx={{ mr: 2, color: theme.palette.primary.light }} /> : <LockIcon sx={{ mr: 2, color: theme.palette.primary.light }} />}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                background: 'linear-gradient(45deg, #64b5f6 30%, #2196f3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
              }}
            >
              {isAdmin ? 'Administration' : 'Gestion des Incidents'}
            </Typography>
          </Box>
          <Tooltip title="Paramètres du profil">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{
                ml: 2,
                background: isAdmin
                  ? 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                  : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                '&:hover': {
                  background: isAdmin
                    ? 'linear-gradient(45deg, #0d47a1 30%, #1565c0 90%)'
                    : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                },
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {isAdmin ? <AdminIcon /> : <PersonIcon />}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            TransitionComponent={Fade}
            PaperProps={{
              sx: {
                mt: 1.5,
                background: 'rgba(10, 25, 41, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '& .MuiMenuItem-root': {
                  color: 'white',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                {isAdmin ? <AdminIcon fontSize="small" sx={{ color: 'white' }} /> : <PersonIcon fontSize="small" sx={{ color: 'white' }} />}
              </ListItemIcon>
              <Typography variant="body2">Profil</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <Typography variant="body2">Déconnexion</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...{
              width: drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }),
          ...(!open && {
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            overflowX: 'hidden',
          }),
          '& .MuiDrawer-paper': {
            background: 'rgba(10, 25, 41, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  ...(location.pathname === item.path && {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }),
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: 'white',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout; 