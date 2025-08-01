import { Link } from 'react-router-dom';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchApod } from '../../utils/api'; 

export default function Home() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadApod = async () => {
      try {
        const data = await fetchApod(); 
        setApod(data);
      } catch (err) {
        setError("No se pudo cargar la imagen del día.");
      } finally {
        setLoading(false);
      }
    };
    loadApod();
  }, []);


  
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 4, mb: 6 }}>
        🚀 NASAStats - Observatorio Estadístico Espacial
      </Typography>
      <Stack spacing={2} direction="row" justifyContent="center" sx={{ mb: 4 }}>
        <Button variant="contained" component={Link} to="/apod-image" sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>
          🔭 Imagen del día
        </Button>
        <Button variant="contained" component={Link} to="/asteroids" sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}>
          🌑 Ver Asteroides
        </Button>
        <Button variant="contained" component={Link} to="/solar-events" sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}>
          🌞 Ver Eventos Solares
        </Button>
        <Button variant="contained" component={Link} to="/dashboard" sx={{ bgcolor: 'info.main', '&:hover': { bgcolor: 'info.dark' } }}>
          📊 Ir al Dashboard
        </Button>
      </Stack>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        {loading ? (
          <Typography variant="h6">Cargando imagen del día...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom>Imagen astronómica del Día</Typography>
            <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>{apod.title}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}