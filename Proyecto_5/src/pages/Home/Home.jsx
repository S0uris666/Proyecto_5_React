import { Link } from 'react-router-dom';
import { Container, Typography, Button, Stack } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>🚀 NASAStats</Typography>
      <Typography variant="body1" mb={4}>
        Bienvenido al Observatorio Estadístico Espacial. Explora asteroides, eventos solares, tu imagen del día y más con datos de la NASA.
      </Typography>

      <Stack spacing={2}>
        <Button variant="contained" component={Link} to="/asteroids">🌑 Ver Asteroides</Button>
        <Button variant="contained" component={Link} to="/solar-events">🌞 Ver Eventos Solares</Button>
        <Button variant="contained" component={Link} to="/dashboard">📊 Ir al Dashboard</Button>
        <Button variant="contained" component={Link} to="/apod-image"> 🔭Imagen del día</Button>
      </Stack>
    </Container>
  );
}