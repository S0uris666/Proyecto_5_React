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
} from "@mui/material";

export default function ApodImage() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  // Cargar la imagen del día de la NASA
  const loadApod = async (date) => {
    try {
      setLoading(true);
      const data = await fetchApod(date);
      setApod(data);
    } catch (error) {
      console.error("Error cargando la imagen del día:", error);
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
          label= "Fecha"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ mt: 1, width: "250px" }}

        />
        <Button variant="outlined" onClick={handleResetDate}>
          Ver imagen de hoy
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
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
