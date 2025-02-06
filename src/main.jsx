import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TripPlanner from './trip-planner/TripPlanner'
import Navbar from './components/custom/Navbar'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
      </Routes>
      <Toaster position="top-right"
        reverseOrder={false}
      />
    </BrowserRouter>
  </StrictMode>,
)
