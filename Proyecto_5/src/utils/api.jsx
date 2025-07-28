const BASE_URL = import.meta.env.VITE_NASA_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchNeoFeed = async (startDate, endDate) => {
  try {
    const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    console.log("URL usada:", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener datos de NeoWs");
    const data = await response.json();
    return data.near_earth_objects;
  } catch (error) {
    console.error("Error en fetchNeoFeed:", error.message);
    throw error;
  }
};

// Eventos solares desde DONKI (por defecto: CME)
export const fetchDonkiEvents = async (type = "CME", startDate, endDate) => {
  try {
    const url = `${BASE_URL}/DONKI/${type}?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`;
    console.log("URL DONKI:", url); 

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener eventos DONKI");
    return await response.json();
  } catch (error) {
    console.error("Error en fetchDonkiEvents:", error.message);
    throw error;
  }
};

// Astronomy Picture of the Day (APOD)
export const fetchApod = async () => {
  try {
    const url = `${BASE_URL}/planetary/apod?api_key=${API_KEY}`;
    console.log("URL APOD:", url); 

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener APOD");
    return await response.json();
  } catch (error) {
    console.error("Error en fetchApod:", error.message);
    throw error;
  }
};
