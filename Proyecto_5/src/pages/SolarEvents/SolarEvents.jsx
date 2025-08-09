import React, { useState, useEffect } from "react";
import { fetchDonkiEvents } from "../../utils/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from "@mui/material";
import { format, parseISO, isValid } from "date-fns";

export default function SolarEvents() {
  // Función para obtener fecha actual en formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Función para calcular fecha de inicio (30 días antes)
  const getDefaultStartDate = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return thirtyDaysAgo.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [eventType, setEventType] = useState("CME");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos automáticamente al montar el componente
  useEffect(() => {
    handleSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async () => {
    // Validación adicional de fechas
    if (!startDate || !endDate) {
      setError("Por favor seleccione ambas fechas");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setError("La fecha de inicio no puede ser posterior a la fecha final");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await fetchDonkiEvents(eventType, startDate, endDate);
      setEvents(result || []); // Asegurar que siempre sea un array
    } catch (err) {
      console.error("Error fetching solar events:", err);
      setError(`Error al obtener eventos: ${err.message}`);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Función segura para formatear fechas
  const safeFormatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, "dd/MM/yyyy") : "Fecha inválida";
    } catch {
      return "Fecha inválida";
    }
  };

  const eventTypes = [
    { value: "CME", label: "Eyección de masa coronal" },
    { value: "FLR", label: "Llama solar" },
    { value: "SEP", label: "Partículas energéticas solares" },
    { value: "IPS", label: "Perturbación ionosférica" },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Eventos Solares
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="event-type-label">Tipo de Evento</InputLabel>
          <Select
            labelId="event-type-label"
            value={eventType}
            label="Tipo de Evento"
            onChange={(e) => setEventType(e.target.value)}
          >
            {eventTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Fecha inicio"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
          inputProps={{ max: endDate }}
        />

        <TextField
          label="Fecha fin"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
          inputProps={{ min: startDate, max: getCurrentDate() }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{ height: "56px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Buscar Eventos"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && events.length === 0 && !error && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No se encontraron eventos para el período seleccionado
        </Alert>
      )}

      {events.length > 0 && (
        <Paper sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{safeFormatDate(event.startTime)}</TableCell>
                  <TableCell>{eventType}</TableCell>
                  <TableCell>
                    {event.description || "Sin descripción disponible"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
