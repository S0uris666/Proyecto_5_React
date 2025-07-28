import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { fetchObservations } from './utils/api.jsx'

async function testApi() {
  try {
    const data = await fetchObservations({ pageSize: 5 });
    console.log('✅ Observaciones obtenidas:', data);
  } catch (err) {
    console.error('❌ Error al consumir la API:', err.message);
  }
}

testApi();





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
