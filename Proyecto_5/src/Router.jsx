import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Asteroids from '../pages/Asteroids';
import SolarEvents from '../pages/SolarEvents';
import Dashboard from '../pages/Dashboard';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asteroids" element={<Asteroids />} />
        <Route path="/solar-events" element={<SolarEvents />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}