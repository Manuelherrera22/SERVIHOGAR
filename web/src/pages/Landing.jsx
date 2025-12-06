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
  useMediaQuery
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
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
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
  borderRadius: 16,
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  },
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: 12,
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  minWidth: 200,
  margin: theme.spacing(1),
}));

export default function Landing() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <BuildIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Servicios Confiables',
      description: 'Conecta con técnicos verificados y profesionales para todos tus servicios del hogar.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: '100% Seguro',
      description: 'Pagos seguros y transparentes. Técnicos verificados con calificaciones reales.'
    },
    {
      icon: <PaymentIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Pago Fácil',
      description: 'Paga directamente desde la app. Sin complicaciones, sin efectivo.'
    },
    {
      icon: <StarIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Calificaciones',
      description: 'Sistema de reseñas y calificaciones para garantizar la mejor experiencia.'
    }
  ];

  const handleDownload = (platform) => {
    if (platform === 'android') {
      // Aquí iría el link al APK o Google Play Store
      window.open('https://play.google.com/store/apps/details?id=com.servihome.app', '_blank');
    } else if (platform === 'ios') {
      // Aquí iría el link al App Store
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
    <Box>
      <AppBar position="static" sx={{ background: 'white', boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <Toolbar>
          <HomeIcon sx={{ color: '#667eea', mr: 2, fontSize: 32 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#333', fontWeight: 700 }}>
            ServiHome
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{ mr: 2, borderRadius: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none'
            }}
          >
            Panel Admin
          </Button>
        </Toolbar>
      </AppBar>

      <GradientBox>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.2
                }}
              >
                Servicios Técnicos
                <br />
                <Box component="span" sx={{ color: '#ffd700' }}>
                  Confiables
                </Box>
                {' '}para tu Hogar
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                Conecta con técnicos verificados. Solicita servicios, recibe cotizaciones
                transparentes y paga de forma segura. Todo desde tu móvil.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <DownloadButton
                  variant="contained"
                  startIcon={<PhoneIcon />}
                  onClick={() => handleDownload('android')}
                  sx={{
                    background: 'white',
                    color: '#667eea',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.9)',
                    }
                  }}
                >
                  Descargar Android
                </DownloadButton>
                <DownloadButton
                  variant="contained"
                  startIcon={<AppleIcon />}
                  onClick={() => handleDownload('ios')}
                  sx={{
                    background: 'white',
                    color: '#667eea',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.9)',
                    }
                  }}
                >
                  Descargar iOS
                </DownloadButton>
              </Box>
              <Button
                variant="outlined"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={handleInstallPWA}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Instalar App Web (PWA)
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 500,
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 200, opacity: 0.3 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </GradientBox>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2 }}>
          ¿Por qué elegir ServiHome?
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          La plataforma más confiable para servicios técnicos del hogar
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ background: '#f5f7fa', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                Descarga la App
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Disponible para Android e iOS. También puedes instalarla como app web
                para acceso rápido desde tu navegador.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  flexWrap: 'wrap'
                }}
              >
                <Card sx={{ width: 200, borderRadius: 3, p: 2, textAlign: 'center' }}>
                  <PhoneIcon sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Android
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Disponible en Google Play
                  </Typography>
                </Card>
                <Card sx={{ width: 200, borderRadius: 3, p: 2, textAlign: 'center' }}>
                  <AppleIcon sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
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

      <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', py: 6 }}>
        <Container maxWidth="lg" align="center">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ¿Listo para comenzar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
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
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
              }
            }}
          >
            Descargar Ahora
          </Button>
        </Container>
      </Box>

      <Box sx={{ py: 4, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 ServiHome. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

