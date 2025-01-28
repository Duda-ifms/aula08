import React from 'react' 
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Registrar from './pages/Registro'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registro" element={<Registrar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
