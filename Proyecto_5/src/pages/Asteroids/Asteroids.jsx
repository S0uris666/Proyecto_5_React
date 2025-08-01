import React, { useState, useEffect, useCallback } from "react";
import { fetchNeoFeed } from "../../utils/api";
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function Asteroids() {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


  const handleSearch = useCallback(async () => {
    const { startDate, endDate } = dateRange;
    if (!startDate || !endDate) {
      setError("Por favor, selecciona ambas fechas");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setError("La fecha de inicio no puede ser posterior a la fecha de fin");
      return;
    }

    // Calcular la diferencia en días
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      setError("El rango de fechas no puede exceder 7 días");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await fetchNeoFeed(startDate, endDate);
      const filteredData = Object.entries(result)
        .filter(([date, asteroids]) => asteroids.length > 0)
        .map(([date, asteroids]) => ({ date, asteroids }));

      setData(filteredData);
    } catch (err) {
      setError(
        "No se pudieron obtener los datos de asteroides: " + err.message
      );
    } finally {
      setLoading(false);
    }
  },[dateRange]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      handleSearch();
    }
  }, [dateRange, handleSearch]);


  const formatDate = (dateString) => {
    return format(parseISO(dateString), "PPPP", { locale: es });
  };

  const handleOpenDetails = (asteroid) => {
    setSelectedAsteroid(asteroid);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAsteroid(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" mb={3}>
        Búsqueda de Asteroides Cercanos a la Tierra
      </Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Fecha inicio"
          type="date"
          value={dateRange.startDate}
          onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          sx={{ minWidth: 150 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fecha fin"
          type="date"
          value={dateRange.endDate}
          onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          sx={{ minWidth: 150 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Buscar"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && data.length === 0 && (
        <Typography>
          No hay asteroides para las fechas seleccionadas.
        </Typography>
      )}

      {!loading && data.length > 0 && (
        <Paper>
          {data.map(({ date, asteroids }) => (
            <Box key={date} mb={4} p={2}>
              <Typography variant="h6" mb={2}>
                Fecha: {formatDate(date)}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Tamaño estimado (m)</TableCell>
                    <TableCell>Distancia mínima (km)</TableCell>
                    <TableCell>Velocidad (km/h)</TableCell>
                    <TableCell>Peligroso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asteroids.map((asteroid) => {
                    const diameter =
                      asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(
                        1
                      );
                    const closeApproachData = asteroid.close_approach_data[0];
                    const distance = parseFloat(
                      closeApproachData.miss_distance.kilometers
                    ).toFixed(0);
                    const velocity = parseFloat(
                      closeApproachData.relative_velocity.kilometers_per_hour
                    ).toFixed(0);
                    const isHazardous =
                      asteroid.is_potentially_hazardous_asteroid;

                    return (
                      <TableRow
                        key={asteroid.id}
                        hover
                        onClick={() => handleOpenDetails(asteroid)}
                      >
                        <TableCell>{asteroid.name}</TableCell>
                        <TableCell>{diameter}</TableCell>
                        <TableCell>{distance}</TableCell>
                        <TableCell>{velocity}</TableCell>
                        <TableCell>
                          <Chip
                            label={isHazardous ? "Sí" : "No"}
                            color={isHazardous ? "error" : "success"}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          ))}
        </Paper>
      )}

      {/* Diálogo de detalles del asteroide */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedAsteroid && (
          <>
            <DialogTitle>{selectedAsteroid.name}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="body1">
                  <strong>Diámetro máximo estimado:</strong>{" "}
                  {selectedAsteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(
                    1
                  )}{" "}
                  metros
                </Typography>
                <Typography variant="body1">
                  <strong>Distancia mínima a la Tierra:</strong>{" "}
                  {parseFloat(
                    selectedAsteroid.close_approach_data[0].miss_distance
                      .kilometers
                  ).toFixed(0)}{" "}
                  km
                </Typography>
                <Typography variant="body1">
                  <strong>Velocidad relativa:</strong>{" "}
                  {parseFloat(
                    selectedAsteroid.close_approach_data[0].relative_velocity
                      .kilometers_per_hour
                  ).toFixed(0)}{" "}
                  km/h
                </Typography>
                <Typography variant="body1">
                  <strong>Clasificación de peligro:</strong>{" "}
                  {selectedAsteroid.is_potentially_hazardous_asteroid
                    ? "POTENCIALMENTE PELIGROSO"
                    : "No peligroso"}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cerrar</Button>
              <Button
                href={selectedAsteroid.nasa_jpl_url}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                Ver en NASA JPL
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
