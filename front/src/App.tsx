
import React, { useEffect, useState } from 'react';
import HomePage from './pages/homePage/HomePage'
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Archive from './pages/archive/Archive';




const App = () => {



  return (
    <HashRouter>
      <div className='appContainer'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/archive' element={<Archive />} />
        </Routes>
      </div>
    </HashRouter>

  );
}

export default App;

