import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
/* import {Asteroids} from './pages/Asteroids/Asteroids.jsx';
import {SolarEvents} from './pages/SolarEvents/SolarEvents.jsx';
import {Dashboard} from './pages/Dashboard/Dashboard.jsx';
import {ApodImage} from './pages/ApodImage/ApodImage.jsx'; */

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
 {/*        <Route path="/asteroids" element={<Asteroids />} />
        <Route path="/solar-events" element={<SolarEvents />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apod-image" element={<ApodImage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}