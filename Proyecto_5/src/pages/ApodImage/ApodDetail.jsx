import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchApod } from "../../utils/api";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Alert,
} from "@mui/material";

export default function ApodDetail() {
  const { date } = useParams();
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchApod(date);
        setApod(data);
      } catch (e) {
        setError("No se pudo cargar la imagen.",e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [date]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardMedia
          component="img"
          image={apod.url}
          alt={apod.title}
          sx={{ maxHeight: 600 }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {apod.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {apod.date}
          </Typography>
          <Typography variant="body1" mt={2}>
            {apod.explanation}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}