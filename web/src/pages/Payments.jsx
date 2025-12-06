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
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  AttachMoney as MoneyIcon
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

export default function Payments() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const response = await api.get('/payments');
      setPayments(response.data.payments || []);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      processing: 'info',
      completed: 'success',
      failed: 'error',
      refunded: 'default'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pendiente',
      processing: 'Procesando',
      completed: 'Completado',
      failed: 'Fallido',
      refunded: 'Reembolsado'
    };
    return texts[status] || status;
  };

  const filteredPayments = payments.filter(payment =>
    payment.service?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.technician?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    totalRevenue: payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.amount || 0), 0)
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
          Gestión de Pagos
        </Typography>
        <Typography 
          variant={isMobile ? 'body2' : 'body1'} 
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          Monitorea y administra todos los pagos del sistema
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
                Total Pagos
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
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: { xs: 2, md: 3 },
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <MoneyIcon sx={{ color: 'primary.main', fontSize: { xs: 20, md: 24 } }} />
                <Typography 
                  variant={isMobile ? 'caption' : 'body2'} 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
                >
                  Ingresos Totales
                </Typography>
              </Box>
              <Typography 
                variant={isMobile ? 'h6' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  fontSize: { xs: '1.25rem', md: '2rem' }
                }}
              >
                ${stats.totalRevenue.toFixed(2)}
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
            Historial de Pagos
          </Typography>
          <TextField
            size="small"
            placeholder="Buscar pagos..."
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loading ? (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                Cargando...
              </Typography>
            ) : filteredPayments.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                No hay pagos disponibles
              </Typography>
            ) : (
              filteredPayments.map((payment) => (
                <Card key={payment._id} sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>
                        {payment.service?.title || 'N/A'}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>
                        ${payment.amount?.toFixed(2) || '0.00'}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      {payment.user?.name || 'N/A'} → {payment.technician?.name || 'N/A'}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1.5 }}>
                      <Chip
                        label={getStatusText(payment.status)}
                        color={getStatusColor(payment.status)}
                        size="small"
                        sx={{ fontSize: '0.7rem', height: 24 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : new Date(payment.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Servicio</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Usuario</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Técnico</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }} align="right">Monto</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Estado</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">Cargando...</Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">No hay pagos disponibles</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <StyledTableRow key={payment._id}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {payment.service?.title || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>{payment.user?.name || 'N/A'}</TableCell>
                      <TableCell>{payment.technician?.name || 'N/A'}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                          ${payment.amount?.toFixed(2) || '0.00'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusText(payment.status)}
                          color={getStatusColor(payment.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : new Date(payment.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
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
