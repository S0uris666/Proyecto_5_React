
export const fetchNeoFeed = async (startDate, endDate) => {
  try {
    const baseUrl = import.meta.env.VITE_NASA_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    const url = `${baseUrl}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
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


