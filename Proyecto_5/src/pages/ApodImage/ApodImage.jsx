import React, { useEffect, useState } from 'react';
import { fetchApod } from '../../utils/api';

export default function ApodImage() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

    // Cargar la imagen del día de la NASA
    const loadApod = async (date) => {
        try {
            setLoading(true);
            const data = await fetchApod(date);
            setApod(data);
        }catch (error) {
            console.error('Error cargando la imagen del día:', error);
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
  }


    return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Imagen Astronímica del día</h1>
      <label style={{marginBottom: '1rem',display: 'block'}}>
        Selecciona una fecha:
        <input
          type="date"
          max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
          value={selectedDate}
          onChange={handleDateChange}
          style={{ marginLeft: '0.5rem' }}
        />
        </label>
        {loading && <p>Cargando...</p>}
        {!loading && apod &&(<>
          <h2>{apod.title}</h2>
          <p>{apod.date}</p>
          {apod.media_type==='image'?(<img src={apod.url} alt={apod.title} style={{ maxWidth: '100%', height: 'auto' }} />):(
            <iframe
              title="APOD video"
              src={apod.url}
              allow="encrypted-media"
              allowFullScreen
              style={{ width: '100%', height: '500px', marginTop: '1rem' }}
            />)}
      <p style={{ marginTop: '1rem' ,textAlign:'justify'}}>{apod.explanation}</p>
      </>
      )}
      {!loading && !apod && <p>No se pudo cargar la imagen para esa fecha.</p>}
    </div>
  );

}