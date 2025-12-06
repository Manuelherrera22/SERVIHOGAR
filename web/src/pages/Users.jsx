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
  Avatar,
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
  Person as PersonIcon
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

export default function Users() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/users/technicians');
      setUsers(response.data.technicians || []);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm)
  );

  const stats = {
    total: users.length,
    technicians: users.filter(u => u.role === 'technician').length,
    active: users.filter(u => u.isActive).length,
    verified: users.filter(u => u.technicianProfile?.isVerified).length
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
          Gestión de Usuarios
        </Typography>
        <Typography 
          variant={isMobile ? 'body2' : 'body1'} 
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          Administra usuarios y técnicos del sistema
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
                Total Usuarios
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
                Técnicos
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'info.main',
                  fontSize: { xs: '1.25rem', md: '2rem' }
                }}
              >
                {stats.technicians}
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
                Activos
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'success.main',
                  fontSize: { xs: '1.25rem', md: '2rem' }
                }}
              >
                {stats.active}
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
                Verificados
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'warning.main',
                  fontSize: { xs: '1.25rem', md: '2rem' }
                }}
              >
                {stats.verified}
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
            Lista de Usuarios
          </Typography>
          <TextField
            size="small"
            placeholder="Buscar usuarios..."
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
            ) : filteredUsers.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                No hay usuarios disponibles
              </Typography>
            ) : (
              filteredUsers.map((user) => (
                <Card key={user._id} sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                        {user.name?.charAt(0)?.toUpperCase() || <PersonIcon />}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1.5 }}>
                      <Chip
                        label={user.role === 'technician' ? 'Técnico' : 'Usuario'}
                        color={user.role === 'technician' ? 'primary' : 'default'}
                        size="small"
                        sx={{ fontSize: '0.7rem' }}
                      />
                      {user.technicianProfile?.rating && (
                        <Chip
                          label={`${user.technicianProfile.rating.toFixed(1)} ⭐`}
                          size="small"
                          color="warning"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      )}
                      <Chip
                        label={user.isActive ? 'Activo' : 'Inactivo'}
                        color={user.isActive ? 'success' : 'default'}
                        size="small"
                        sx={{ fontSize: '0.7rem' }}
                      />
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
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Usuario</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Teléfono</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Rol</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Calificación</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">Cargando...</Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">No hay usuarios disponibles</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <StyledTableRow key={user._id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            {user.name?.charAt(0)?.toUpperCase() || <PersonIcon />}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role === 'technician' ? 'Técnico' : 'Usuario'}
                          color={user.role === 'technician' ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {user.technicianProfile?.rating ? (
                          <Chip
                            label={`${user.technicianProfile.rating.toFixed(1)} ⭐`}
                            size="small"
                            color="warning"
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            N/A
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? 'Activo' : 'Inactivo'}
                          color={user.isActive ? 'success' : 'default'}
                          size="small"
                        />
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
