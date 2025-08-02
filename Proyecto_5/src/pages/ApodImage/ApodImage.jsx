import React, { useEffect, useState } from "react";
import { fetchApod } from "../../utils/api";
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Box,
  FormLabel,
  Card,
  CardMedia,
  CardContent,
  Button,
  Alert,
} from "@mui/material";

// Primer día válido para la API de APOD
const MIN_DATE = "1995-07-01";

// Retorna la fecha actual en formato YYYY-MM-DD
const getToday = () => new Date().toISOString().split("T")[0];

// Retorna la fecha de "un día como hoy" hace X años
const getPastDate = (yearsAgo) => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - yearsAgo);
  return today.toISOString().split("T")[0];
};

export default function ApodImage() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState(null);

  // Cargar la imagen del día de la NASA
  const loadApod = async (date = "") => {
    try {
      setLoading(true);
      setError(null);
      if (date && date < MIN_DATE) {
        throw new Error(`La fecha debe ser posterior a ${MIN_DATE}`);
      }
      const data = await fetchApod(date);
      setApod(data);
    } catch (error) {
      console.error("Error cargando la imagen del día:", error.message);
      setError(
        error.message ||
          "No se pudo cargar la imagen del día. Por favor, verifica la fecha o intenta más tarde."
      );
      setApod(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApod();
  }, []);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    loadApod(date);
  };

  const handleResetDate = () => {
    setSelectedDate("");
    loadApod();
  };

  const handleOneYearAgo = () => {
    const oneYearAgo = getPastDate(1);
    setSelectedDate(oneYearAgo);
    loadApod(oneYearAgo);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Tu imagen Astronómica del Día
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        mb={3}
        flexWrap="wrap"
      >
        <TextField
          id="apod-date"
          label="Fecha"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={selectedDate}
          onChange={handleDateChange}
          inputProps={{
            min: MIN_DATE,
            max: getToday(),
          }}
          sx={{ mt: 1, width: "250px" }}
        />
        <Button variant="outlined" onClick={handleResetDate}>
          Ver imagen de hoy
        </Button>
                <Button variant="outlined" onClick={handleOneYearAgo}>
          Hace 1 año
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : apod ? (
        <Card>
          {apod.media_type === "image" ? (
            <CardMedia
              component="img"
              image={apod.url}
              alt={apod.title}
              sx={{ maxHeight: 600, objectFit: "contain" }}
            />
          ) : (
            <Box
              component="iframe"
              src={apod.url}
              title="APOD Video"
              allow="encrypted-media"
              allowFullScreen
              sx={{ width: "100%", height: 500, border: 0 }}
            />
          )}
          <CardContent>
            <Typography variant="h5">{apod.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {apod.date}
            </Typography>
            <Typography variant="body1" mt={2} textAlign="justify">
              {apod.explanation}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography color="error" textAlign="center">
          No se pudo cargar la imagen para esa fecha.
        </Typography>
      )}
    </Container>
  );
}
