
export async function fetchObservations(filters = {}) {
  const queryParams = new URLSearchParams(filters).toString();
  const url = `${import.meta.env.VITE_NOCTUASKY_API_URL}/observations?${queryParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener observaciones:', error);
    throw error;
  }
}


