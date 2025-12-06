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
  Divider,
  useTheme,
  useMediaQuery
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
  borderRadius: 20,
  background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
  border: `1px solid ${color}30`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 16,
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 16px 32px ${color}40`,
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: { xs: 48, sm: 56, md: 64 },
  height: { xs: 48, sm: 56, md: 64 },
  borderRadius: { xs: 12, md: 16 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
  boxShadow: `0 4px 12px ${color}60`,
}));

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
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
      
      const servicesRes = await api.get('/services').catch(() => ({ data: { services: [] } }));
      const services = servicesRes.data.services || [];
      
      const usersRes = await api.get('/users/technicians').catch(() => ({ data: { technicians: [] } }));
      const users = usersRes.data.technicians || [];
      
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
    <Box sx={{ px: { xs: 1, sm: 2, md: 0 } }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant={isMobile ? 'h5' : 'h4'} 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: { xs: 0.5, md: 1 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          Dashboard
        </Typography>
        <Typography 
          variant={isMobile ? 'body2' : 'body1'} 
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          Bienvenido al panel de control de ServiHome
        </Typography>
      </Box>

      {loading && (
        <LinearProgress 
          sx={{ 
            mb: 3, 
            borderRadius: 1,
            height: { xs: 4, md: 6 }
          }} 
        />
      )}

      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard color={card.color}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  mb: { xs: 1.5, md: 2 } 
                }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant={isMobile ? 'caption' : 'body2'} 
                      color="text.secondary" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant={isMobile ? 'h5' : 'h4'} 
                      component="div" 
                      sx={{ 
                        fontWeight: 700, 
                        color: card.color,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        wordBreak: 'break-word'
                      }}
                    >
                      {card.value}
                    </Typography>
                  </Box>
                  <IconWrapper color={card.color}>
                    {React.cloneElement(card.icon, { 
                      sx: { 
                        fontSize: { xs: 24, sm: 28, md: 32 }, 
                        color: 'white' 
                      } 
                    })}
                  </IconWrapper>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mt: { xs: 1.5, md: 2 },
                  flexWrap: 'wrap',
                  gap: 0.5
                }}>
                  {card.trendUp ? (
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: { xs: 16, md: 18 }, mr: 0.5 }} />
                  ) : (
                    <TrendingDown sx={{ color: '#f44336', fontSize: { xs: 16, md: 18 }, mr: 0.5 }} />
                  )}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: card.trendUp ? '#4CAF50' : '#f44336', 
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', md: '0.75rem' }
                    }}
                  >
                    {card.trend}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      ml: { xs: 0.5, md: 1 },
                      fontSize: { xs: '0.7rem', md: '0.75rem' },
                      display: { xs: 'none', sm: 'inline' }
                    }}
                  >
                    vs mes anterior
                  </Typography>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            borderRadius: { xs: 2, md: 3 }, 
            height: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <Typography 
              variant={isMobile ? 'h6' : 'h5'} 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '1.1rem', md: '1.5rem' }
              }}
            >
              Servicios Recientes
            </Typography>
            {recentServices.length > 0 ? (
              <List sx={{ p: 0 }}>
                {recentServices.map((service, index) => (
                  <React.Fragment key={service._id || index}>
                    <ListItem
                      sx={{
                        borderRadius: { xs: 1.5, md: 2 },
                        mb: { xs: 0.5, md: 1 },
                        bgcolor: 'action.hover',
                        px: { xs: 1.5, md: 2 },
                        py: { xs: 1, md: 1.5 },
                        '&:hover': { bgcolor: 'action.selected' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: 'primary.main',
                          width: { xs: 36, md: 40 },
                          height: { xs: 36, md: 40 }
                        }}>
                          <BuildIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography 
                            variant={isMobile ? 'body2' : 'body1'}
                            sx={{ 
                              fontWeight: 500,
                              fontSize: { xs: '0.875rem', md: '1rem' }
                            }}
                            noWrap
                          >
                            {service.title || 'Servicio sin título'}
                          </Typography>
                        }
                        secondary={
                          <Typography 
                            variant="caption"
                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                          >
                            {service.category || 'Sin categoría'}
                          </Typography>
                        }
                        sx={{ 
                          flex: 1,
                          minWidth: 0,
                          mr: { xs: 1, md: 2 }
                        }}
                      />
                      <Chip
                        label={service.status || 'pending'}
                        size="small"
                        sx={{
                          fontSize: { xs: '0.7rem', md: '0.75rem' },
                          height: { xs: 24, md: 28 }
                        }}
                        color={
                          service.status === 'completed' ? 'success' :
                          service.status === 'in_progress' ? 'info' :
                          service.status === 'pending' ? 'warning' : 'default'
                        }
                      />
                    </ListItem>
                    {index < recentServices.length - 1 && <Divider sx={{ mx: { xs: 1.5, md: 2 } }} />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
                <Typography 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                  No hay servicios recientes
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            borderRadius: { xs: 2, md: 3 }, 
            height: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <Typography 
              variant={isMobile ? 'h6' : 'h5'} 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '1.1rem', md: '1.5rem' }
              }}
            >
              Resumen Rápido
            </Typography>
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: { xs: 0.75, md: 1 },
                alignItems: 'center'
              }}>
                <Typography 
                  variant={isMobile ? 'caption' : 'body2'} 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                >
                  Tasa de Completación
                </Typography>
                <Typography 
                  variant={isMobile ? 'body2' : 'body1'} 
                  fontWeight={600}
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                  {completionRate}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={parseFloat(completionRate)}
                sx={{ 
                  height: { xs: 6, md: 8 }, 
                  borderRadius: { xs: 3, md: 4 }, 
                  bgcolor: 'grey.200' 
                }}
              />
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 1.5, md: 2 } 
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography 
                  variant={isMobile ? 'caption' : 'body2'} 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                >
                  Servicios Completados
                </Typography>
                <Typography 
                  variant={isMobile ? 'body2' : 'body1'} 
                  fontWeight={600}
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                  {stats.completedServices}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography 
                  variant={isMobile ? 'caption' : 'body2'} 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                >
                  Cotizaciones Pendientes
                </Typography>
                <Typography 
                  variant={isMobile ? 'body2' : 'body1'} 
                  fontWeight={600} 
                  color="warning.main"
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                  {stats.pendingQuotes}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography 
                  variant={isMobile ? 'caption' : 'body2'} 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                >
                  Total Usuarios
                </Typography>
                <Typography 
                  variant={isMobile ? 'body2' : 'body1'} 
                  fontWeight={600}
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
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
