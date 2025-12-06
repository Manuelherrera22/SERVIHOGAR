import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import {
  Home as HomeIcon,
  Build as BuildIcon,
  Security as SecurityIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  PhoneAndroid as PhoneIcon,
  Apple as AppleIcon,
  Download as DownloadIcon,
  ArrowForward as ArrowForwardIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(6, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 0),
  },
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(3),
  borderRadius: 20,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0,0,0,0.08)',
  background: 'white',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
    borderColor: '#667eea',
  },
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: 12,
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  minWidth: 180,
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    margin: theme.spacing(0.5, 0),
  },
  margin: theme.spacing(1),
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  borderBottom: '1px solid rgba(0,0,0,0.08)',
}));

export default function Landing() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const features = [
    {
      icon: <BuildIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#667eea' }} />,
      title: 'Servicios Confiables',
      description: 'Conecta con técnicos verificados y profesionales para todos tus servicios del hogar.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#667eea' }} />,
      title: '100% Seguro',
      description: 'Pagos seguros y transparentes. Técnicos verificados con calificaciones reales.'
    },
    {
      icon: <PaymentIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#667eea' }} />,
      title: 'Pago Fácil',
      description: 'Paga directamente desde la app. Sin complicaciones, sin efectivo.'
    },
    {
      icon: <StarIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#667eea' }} />,
      title: 'Calificaciones',
      description: 'Sistema de reseñas y calificaciones para garantizar la mejor experiencia.'
    }
  ];

  const handleDownload = (platform) => {
    if (platform === 'android') {
      window.open('https://play.google.com/store/apps/details?id=com.servihome.app', '_blank');
    } else if (platform === 'ios') {
      window.open('https://apps.apple.com/app/servihome/id123456789', '_blank');
    }
  };

  const handleInstallPWA = () => {
    if ('serviceWorker' in navigator) {
      const deferredPrompt = window.deferredPrompt;
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuario aceptó instalar la PWA');
          }
          window.deferredPrompt = null;
        });
      } else {
        alert('La app ya está instalada o no está disponible para instalación en este navegador');
      }
    } else {
      alert('Tu navegador no soporta aplicaciones web progresivas (PWA)');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StyledAppBar position="sticky">
        <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <HomeIcon sx={{ color: '#667eea', mr: 2, fontSize: { xs: 28, md: 32 } }} />
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              color: '#333', 
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}
          >
            ServiHome
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              Panel Admin
            </Button>
          </Box>
          <IconButton
            sx={{ display: { xs: 'block', sm: 'none' }, color: '#667eea' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        {mobileMenuOpen && (
          <Box sx={{ display: { xs: 'block', sm: 'none' }, p: 2, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <Stack spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Iniciar Sesión
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  textTransform: 'none'
                }}
              >
                Panel Admin
              </Button>
            </Stack>
          </Box>
        )}
      </StyledAppBar>

      <GradientBox>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h3' : isTablet ? 'h2' : 'h1'}
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: { xs: 2, md: 3 },
                  lineHeight: 1.2,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
                }}
              >
                Servicios Técnicos
                <br />
                <Box component="span" sx={{ color: '#ffd700' }}>
                  Confiables
                </Box>
                {' '}para tu Hogar
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                sx={{ 
                  mb: { xs: 3, md: 4 }, 
                  opacity: 0.95,
                  lineHeight: 1.7,
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                Conecta con técnicos verificados. Solicita servicios, recibe cotizaciones
                transparentes y paga de forma segura. Todo desde tu móvil.
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2}
                sx={{ mb: { xs: 3, md: 4 } }}
              >
                <DownloadButton
                  variant="contained"
                  startIcon={<PhoneIcon />}
                  onClick={() => handleDownload('android')}
                  sx={{
                    background: 'white',
                    color: '#667eea',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.95)',
                    }
                  }}
                >
                  {isMobile ? 'Android' : 'Descargar Android'}
                </DownloadButton>
                <DownloadButton
                  variant="contained"
                  startIcon={<AppleIcon />}
                  onClick={() => handleDownload('ios')}
                  sx={{
                    background: 'white',
                    color: '#667eea',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.95)',
                    }
                  }}
                >
                  {isMobile ? 'iOS' : 'Descargar iOS'}
                </DownloadButton>
              </Stack>
              <DownloadButton
                variant="outlined"
                size={isMobile ? 'medium' : 'large'}
                startIcon={<DownloadIcon />}
                onClick={handleInstallPWA}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  borderRadius: 2,
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.25, md: 1.5 },
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255,255,255,0.15)',
                  }
                }}
              >
                {isMobile ? 'Instalar App Web' : 'Instalar App Web (PWA)'}
              </DownloadButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  mt: { xs: 4, md: 0 }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 500 },
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  }}
                >
                  <PhoneIcon sx={{ fontSize: { xs: 120, md: 200 }, opacity: 0.4 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </GradientBox>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant={isMobile ? 'h4' : 'h3'} 
            sx={{ 
              fontWeight: 700, 
              mb: { xs: 1, md: 2 },
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }
            }}
          >
            ¿Por qué elegir ServiHome?
          </Typography>
          <Typography 
            variant={isMobile ? 'body1' : 'h6'} 
            color="text.secondary" 
            sx={{
              fontSize: { xs: '0.95rem', md: '1.25rem' },
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            La plataforma más confiable para servicios técnicos del hogar
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  {feature.icon}
                </Box>
                <Typography 
                  variant={isMobile ? 'h6' : 'h5'} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600, 
                    textAlign: 'center',
                    mb: 1.5,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: { xs: '0.875rem', md: '0.95rem' }
                  }}
                >
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ background: '#f5f7fa', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? 'h4' : 'h3'} 
                sx={{ 
                  fontWeight: 700, 
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1.75rem', md: '2.5rem' }
                }}
              >
                Descarga la App
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                color="text.secondary" 
                sx={{ 
                  mb: { xs: 3, md: 4 },
                  lineHeight: 1.7,
                  fontSize: { xs: '0.95rem', md: '1.15rem' }
                }}
              >
                Disponible para Android e iOS. También puedes instalarla como app web
                para acceso rápido desde tu navegador.
              </Typography>
              <Stack spacing={2} sx={{ maxWidth: { xs: '100%', md: 400 } }}>
                <DownloadButton
                  variant="contained"
                  size="large"
                  startIcon={<PhoneIcon />}
                  onClick={() => handleDownload('android')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                    }
                  }}
                >
                  Descargar para Android
                </DownloadButton>
                <DownloadButton
                  variant="contained"
                  size="large"
                  startIcon={<AppleIcon />}
                  onClick={() => handleDownload('ios')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                    }
                  }}
                >
                  Descargar para iOS
                </DownloadButton>
                <DownloadButton
                  variant="outlined"
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={handleInstallPWA}
                  sx={{
                    borderColor: '#667eea',
                    color: '#667eea',
                    '&:hover': {
                      borderColor: '#764ba2',
                      background: 'rgba(102, 126, 234, 0.04)',
                    }
                  }}
                >
                  Instalar App Web (PWA)
                </DownloadButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: { xs: 2, md: 3 },
                  flexWrap: 'wrap'
                }}
              >
                <Card sx={{ 
                  width: { xs: '100%', sm: 200 }, 
                  borderRadius: 3, 
                  p: { xs: 2, md: 3 }, 
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}>
                  <PhoneIcon sx={{ fontSize: { xs: 60, md: 80 }, color: '#667eea', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Android
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Disponible en Google Play
                  </Typography>
                </Card>
                <Card sx={{ 
                  width: { xs: '100%', sm: 200 }, 
                  borderRadius: 3, 
                  p: { xs: 2, md: 3 }, 
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}>
                  <AppleIcon sx={{ fontSize: { xs: 60, md: 80 }, color: '#667eea', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    iOS
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Disponible en App Store
                  </Typography>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        py: { xs: 6, md: 8 } 
      }}>
        <Container maxWidth="lg" align="center" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography 
            variant={isMobile ? 'h4' : 'h3'} 
            sx={{ 
              fontWeight: 700, 
              mb: { xs: 2, md: 3 },
              fontSize: { xs: '1.75rem', md: '2.5rem' }
            }}
          >
            ¿Listo para comenzar?
          </Typography>
          <Typography 
            variant={isMobile ? 'body1' : 'h6'} 
            sx={{ 
              mb: { xs: 3, md: 4 }, 
              opacity: 0.95,
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Descarga la app ahora y comienza a solicitar servicios
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => handleDownload('android')}
            sx={{
              background: 'white',
              color: '#667eea',
              px: { xs: 4, md: 6 },
              py: { xs: 1.5, md: 2 },
              borderRadius: 2,
              textTransform: 'none',
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(255,255,255,0.95)',
              }
            }}
          >
            Descargar Ahora
          </Button>
        </Container>
      </Box>

      <Box sx={{ 
        py: { xs: 3, md: 4 }, 
        borderTop: '1px solid rgba(0,0,0,0.08)',
        background: '#fafafa'
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 ServiHome. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
