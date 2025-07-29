import React, { useEffect, useState } from 'react';
import { fetchApod } from '../../utils/api';

export default function ApodImage() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);


 useEffect(() => {
    const loadApod = async () => {
      try {
        const data = await fetchApod();
        setApod(data);
      } catch (error) {
        console.error('Error cargando la imagen del día:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApod();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!apod) return <p>No se pudo cargar la imagen del día.</p>;

    return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>{apod.title}</h1>
      <p>{apod.date}</p>
      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <iframe
          title="APOD video"
          src={apod.url}
          allow="encrypted-media"
          allowFullScreen
          style={{ width: '100%', height: '500px' }}
        />
      )}
      <p style={{ marginTop: '1rem' }}>{apod.explanation}</p>
    </div>
  );

}