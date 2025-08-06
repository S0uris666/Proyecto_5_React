import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { fetchNeoFeed, fetchDonkiEvents } from "./utils/api.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import BrokenComponent from "./components/BrokenComponent.jsx";

async function testApi() {
  const startDate = "2025-07-20";
  const endDate = "2025-07-25";

  try {
    const data = await fetchNeoFeed(startDate, endDate);
    const data_DONKI = await fetchDonkiEvents("CME", startDate, endDate);

    console.log(" Observaciones obtenidas:", data);
    console.log(" Eventos DONKI obtenidos:", data_DONKI);
  } catch (err) {
    console.error(" Error al consumir la API:", err.message);
  }
}

testApi();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      
    </ErrorBoundary>
  </StrictMode>
);
