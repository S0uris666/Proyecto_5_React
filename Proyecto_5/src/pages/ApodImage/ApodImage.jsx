import React, { useEffect, useState } from "react";
import { fetchApod } from "../../utils/api";
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Primer día válido para la API de APOD
const MIN_DATE = "1995-07-01";
const TODAY = new Date();
const formatDate = (date) => date.toISOString().split("T")[0];

const getSameDayPreviousYears = (baseDate, earliestYear = 1995) => {
  const current = new Date(baseDate);
  const day = current.getDate();
  const month = current.getMonth(); // 0-indexed
  const currentYear = current.getFullYear();

  const dates = [];

  for (let year = currentYear - 1; year >= earliestYear; year--) {
    const past = new Date(year, month, day);
    if (past < new Date(MIN_DATE)) break;
    dates.push(formatDate(past));
  }

  return dates;
};

export default function ApodImage() {
  const [apod, setApod] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState(null);

  // Cargar la imagen del día de la NASA
  const loadApodAndGallery = async (date = "") => {
    try {
      setLoading(true);
      setError(null);

      if (date && date < MIN_DATE) {
        throw new Error("La fecha debe ser posterior al 1 de julio de 1995.");
      }

      const apodData = await fetchApod(date);
      setApod(apodData);

      const galleryDates = getSameDayPreviousYears(apodData.date);
      setGalleryLoading(true);

      const galleryData = await Promise.allSettled(galleryDates.map(fetchApod));
      const validGallery = galleryData
        .filter(
          (res) =>
            res.status === "fulfilled" && res.value.media_type === "image"
        )
        .map((res) => res.value);

      setGallery(validGallery);
    } catch (err) {
      console.error("Error al cargar APOD o galería:", err);
      setError(err.message || "Ocurrió un error inesperado.");
      setApod(null);
      setGallery([]);
    } finally {
      setLoading(false);
      setGalleryLoading(false);
    }
  };

  useEffect(() => {
    loadApodAndGallery();
  }, []);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    loadApodAndGallery(date);
  };

  const handleResetDate = () => {
    setSelectedDate("");
    loadApodAndGallery();
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
            max: formatDate(TODAY),
          }}
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

      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Un día como hoy en años anteriores
        </Typography>

        {galleryLoading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : gallery.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {gallery.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.date}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={item.url}
                      alt={item.title}
                      sx={{
                        height: 180,
                        objectFit: "cover",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      title={item.title}
                      sx={{ fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(item.date), "d 'de' MMMM 'de' yyyy", {
                        locale: es,
                      })}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary" mt={2}>
            No hay imágenes disponibles para años anteriores en esta fecha.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
