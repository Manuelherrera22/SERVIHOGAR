import React, { useState } from 'react';
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
  Avatar,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 280;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    borderRight: '1px solid rgba(0,0,0,0.08)',
    boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      maxWidth: 320,
    },
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  gap: theme.spacing(1.5),
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Servicios', icon: <BuildIcon />, path: '/admin/services' },
  { text: 'Usuarios', icon: <PeopleIcon />, path: '/admin/users' },
  { text: 'Pagos', icon: <PaymentIcon />, path: '/admin/payments' }
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <div>
      <LogoBox>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 48,
            height: 48,
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}
        >
          <HomeIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            ServiHome
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Panel Admin
          </Typography>
        </Box>
      </LogoBox>
      <Divider />
      <List sx={{ px: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                  },
                },
                '&:hover': {
                  background: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              mx: 1,
              color: 'error.main',
              '&:hover': {
                background: 'rgba(244, 67, 54, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
              {user?.name || 'Usuario'}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email || 'usuario@servihome.com'}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={user?.role === 'admin' ? 'Administrador' : user?.role || 'Usuario'}
          size="small"
          color="primary"
          sx={{ width: '100%', mt: 1 }}
        />
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {location.pathname === '/admin' ? 'Dashboard' : 
             location.pathname === '/admin/services' ? 'Servicios' :
             location.pathname === '/admin/users' ? 'Usuarios' :
             location.pathname === '/admin/payments' ? 'Pagos' : 'ServiHome'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user?.name || 'Administrador'}
            </Typography>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(255,255,255,0.2)' }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </Avatar>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: { xs: '85%', sm: drawerWidth },
              maxWidth: 320
            }
          }}
        >
          {drawer}
        </StyledDrawer>
        <StyledDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              display: 'flex',
              flexDirection: 'column'
            }
          }}
          open
        >
          {drawer}
        </StyledDrawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 2, md: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
          maxWidth: '100%',
          overflowX: 'hidden'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
