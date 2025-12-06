import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../services/api';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
}));

export default function Services() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.services || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      quoted: 'info',
      accepted: 'success',
      in_progress: 'secondary',
      completed: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pendiente',
      quoted: 'Cotizado',
      accepted: 'Aceptado',
      in_progress: 'En progreso',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return texts[status] || status;
  };

  const filteredServices = services.filter(service =>
    service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: services.length,
    pending: services.filter(s => s.status === 'pending').length,
    inProgress: services.filter(s => s.status === 'in_progress').length,
    completed: services.filter(s => s.status === 'completed').length
  };

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
          Gestión de Servicios
        </Typography>
        <Typography 
          variant={isMobile ? 'body2' : 'body1'} 
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          Administra y monitorea todos los servicios solicitados
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ mb: { xs: 2, md: 3 } }}>
        <Grid item xs={6} sm={6} md={3}>
          <Card sx={{ borderRadius: { xs: 2, md: 3 } }}>
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
              <Typography 
                variant={isMobile ? 'caption' : 'body2'} 
                color="text.secondary" 
                gutterBottom
                sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
              >
                Total Servicios
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  fontSize: { xs: '1.25rem', md: '2rem' }
                }}
              >
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Card sx={{ borderRadius: { xs: 2, md: 3 } }}>
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
              <Typography 
                variant={isMobile ? 'caption' : 'body2'} 
                color="text.secondary" 
                gutterBottom
                sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
              >
                Pendientes
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'warning.main',
                  fontSize: { xs: '1.25rem', md: '2rem' }
                }}
              >
                {stats.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Card sx={{ borderRadius: { xs: 2, md: 3 } }}>
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
              <Typography 
                variant={isMobile ? 'caption' : 'body2'} 
                color="text.secondary" 
                gutterBottom
                sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
              >
                En Progreso
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'info.main',
                  fontSize: { xs: '1.25rem', md: '2rem' }
                }}
              >
                {stats.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Card sx={{ borderRadius: { xs: 2, md: 3 } }}>
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
              <Typography 
                variant={isMobile ? 'caption' : 'body2'} 
                color="text.secondary" 
                gutterBottom
                sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
              >
                Completados
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'success.main',
                  fontSize: { xs: '1.25rem', md: '2rem' }
                }}
              >
                {stats.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ 
        p: { xs: 2, md: 3 }, 
        borderRadius: { xs: 2, md: 3 },
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' }, 
          mb: { xs: 2, md: 3 },
          gap: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.1rem', md: '1.5rem' }
            }}
          >
            Lista de Servicios
          </Typography>
          <TextField
            size="small"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ 
              width: { xs: '100%', sm: 300 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Box>

        {isMobile ? (
          // Vista móvil: Cards
          <Box>
            {loading ? (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                Cargando...
              </Typography>
            ) : filteredServices.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                No hay servicios disponibles
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredServices.map((service) => (
                  <Card key={service._id} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>
                          {service.title}
                        </Typography>
                        <Chip
                          label={getStatusText(service.status)}
                          color={getStatusColor(service.status)}
                          size="small"
                          sx={{ fontSize: '0.7rem', height: 24 }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        {service.category} • {service.user?.name || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(service.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        ) : (
          // Vista desktop: Tabla
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: { sm: '0.875rem', md: '1rem' } }}>
                    Título
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: { sm: '0.875rem', md: '1rem' } }}>
                    Categoría
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: { sm: '0.875rem', md: '1rem' } }}>
                    Usuario
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: { sm: '0.875rem', md: '1rem' } }}>
                    Estado
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: { sm: '0.875rem', md: '1rem' } }}>
                    Fecha
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: { sm: '0.875rem', md: '1rem' } }} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">Cargando...</Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredServices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">No hay servicios disponibles</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredServices.map((service) => (
                    <StyledTableRow key={service._id}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {service.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={service.category}
                          size="small"
                          sx={{ textTransform: 'capitalize', fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell>{service.user?.name || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusText(service.status)}
                          color={getStatusColor(service.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(service.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => console.log('Ver servicio:', service._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
