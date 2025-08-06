import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Asteroids from './pages/Asteroids/Asteroids.jsx';
/*  import SolarEvents from './pages/SolarEvents/SolarEvents.jsx'; */
import {Dashboard} from './pages/Dashboard/Dashboard.jsx'; 
import ApodImage from './pages/ApodImage/ApodImage.jsx'; 
import ApodDetail from './pages/ApodImage/ApodDetail.jsx';
import Layout from './components/Layout/Layout.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/asteroids" element={<Asteroids />} />
         {/* <Route path="/solar-events" element={<SolarEvents />} /> */}
         <Route path="/apod/:date" element={<ApodDetail />} />
       <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/apod-image" element={<ApodImage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}