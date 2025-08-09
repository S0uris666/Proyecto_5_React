import React, { useState } from "react";
import { fetchNeoFeed } from "../../utils/api";
import { addDays, format, parseISO } from "date-fns";
import { Container, Typography, TextField, Button, CircularProgress, Alert } from "@mui/material";

function splitDateRangeBy7Days(start, end) {
  const ranges = [];
  let current = new Date(start);
  while (current < end) {
    const rangeStart = current;
    const rangeEnd = addDays(current, 6);
    ranges.push({
      start: format(rangeStart, "yyyy-MM-dd"),
      end: format(rangeEnd < end ? rangeEnd : end, "yyyy-MM-dd"),
    });
    current = addDays(current, 7);
  }
  return ranges;
}

export default function AsteroidsDashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!startDate || !endDate) {
      setError("Selecciona ambas fechas");
      return;
    }

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    if (start > end) {
      setError("La fecha inicial debe ser menor que la final");
      return;
    }

    const dateChunks = splitDateRangeBy7Days(start, end);
    setLoading(true);
    setError("");
    const allAsteroids = [];

    try {
      for (const chunk of dateChunks) {
        const data = await fetchNeoFeed(chunk.start, chunk.end);
        Object.values(data).forEach((list) => {
          allAsteroids.push(...list);
        });
      }

      setAsteroids(allAsteroids);
    } catch (err) {
      setError("Error al cargar datos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" mb={2}>Dashboard de Asteroides</Typography>

      <TextField
        type="date"
        label="Desde"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mr: 2 }}
      />
      <TextField
        type="date"
        label="Hasta"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={handleFetch} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Cargar"}
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {!loading && asteroids.length > 0 && (
        <Typography variant="body1" mt={3}>
          Total de asteroides encontrados: {asteroids.length}
        </Typography>
      )}
    </Container>
  );
}