import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Build as BuildIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../services/api';

const StatCard = styled(Card)(({ theme, color }) => ({
  height: '100%',
  borderRadius: 16,
  background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
  border: `1px solid ${color}30`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 24px ${color}40`,
  },
}));

const IconWrapper = styled(Box)(({ color }) => ({
  width: 64,
  height: 64,
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
  boxShadow: `0 4px 12px ${color}60`,
}));

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    completedServices: 0,
    totalUsers: 0,
    totalTechnicians: 0,
    totalRevenue: 0,
    pendingQuotes: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentServices, setRecentServices] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      // Load services
      const servicesRes = await api.get('/services').catch(() => ({ data: { services: [] } }));
      const services = servicesRes.data.services || [];
      
      // Load users
      const usersRes = await api.get('/users/technicians').catch(() => ({ data: { technicians: [] } }));
      const users = usersRes.data.technicians || [];
      
      // Load payments
      const paymentsRes = await api.get('/payments').catch(() => ({ data: { payments: [] } }));
      const payments = paymentsRes.data.payments || [];
      const completedPayments = payments.filter(p => p.status === 'completed');
      const revenue = completedPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

      setStats({
        totalServices: services.length,
        activeServices: services.filter(s => s.status === 'in_progress').length,
        completedServices: services.filter(s => s.status === 'completed').length,
        totalUsers: users.length,
        totalTechnicians: users.filter(u => u.role === 'technician').length,
        totalRevenue: revenue,
        pendingQuotes: services.filter(s => s.status === 'quoted').length
      });

      // Get recent services
      setRecentServices(services.slice(0, 5));
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Servicios',
      value: stats.totalServices,
      icon: <BuildIcon />,
      color: '#4CAF50',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Servicios Activos',
      value: stats.activeServices,
      icon: <AssignmentIcon />,
      color: '#2196F3',
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Técnicos Registrados',
      value: stats.totalTechnicians,
      icon: <PeopleIcon />,
      color: '#FF9800',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Ingresos Totales',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <PaymentIcon />,
      color: '#9C27B0',
      trend: '+23%',
      trendUp: true
    }
  ];

  const completionRate = stats.totalServices > 0 
    ? ((stats.completedServices / stats.totalServices) * 100).toFixed(1)
    : 0;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido al panel de control de ServiHome
        </Typography>
      </Box>

      {loading && <LinearProgress sx={{ mb: 3, borderRadius: 1 }} />}

      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard color={card.color}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: card.color }}>
                      {card.value}
                    </Typography>
                  </Box>
                  <IconWrapper color={card.color}>
                    {React.cloneElement(card.icon, { sx: { fontSize: 32, color: 'white' } })}
                  </IconWrapper>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  {card.trendUp ? (
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: 18, mr: 0.5 }} />
                  ) : (
                    <TrendingDown sx={{ color: '#f44336', fontSize: 18, mr: 0.5 }} />
                  )}
                  <Typography variant="caption" sx={{ color: card.trendUp ? '#4CAF50' : '#f44336', fontWeight: 600 }}>
                    {card.trend}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    vs mes anterior
                  </Typography>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Servicios Recientes
            </Typography>
            {recentServices.length > 0 ? (
              <List>
                {recentServices.map((service, index) => (
                  <React.Fragment key={service._id || index}>
                    <ListItem
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        bgcolor: 'action.hover',
                        '&:hover': { bgcolor: 'action.selected' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <BuildIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={service.title || 'Servicio sin título'}
                        secondary={service.category || 'Sin categoría'}
                      />
                      <Chip
                        label={service.status || 'pending'}
                        size="small"
                        color={
                          service.status === 'completed' ? 'success' :
                          service.status === 'in_progress' ? 'info' :
                          service.status === 'pending' ? 'warning' : 'default'
                        }
                      />
                    </ListItem>
                    {index < recentServices.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">No hay servicios recientes</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Resumen Rápido
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Tasa de Completación
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {completionRate}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={parseFloat(completionRate)}
                sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Servicios Completados
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {stats.completedServices}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Cotizaciones Pendientes
                </Typography>
                <Typography variant="body2" fontWeight={600} color="warning.main">
                  {stats.pendingQuotes}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Total Usuarios
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {stats.totalUsers}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
