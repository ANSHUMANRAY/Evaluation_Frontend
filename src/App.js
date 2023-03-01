import React from 'react';
import {Home, Details} from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/themeContext';
// import { EventDetails } from './components';
// import Body from './components/Body/index';

function App() {
  return (
    <div className='app'>
      
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<ThemeProvider><Home/></ThemeProvider>} />
          <Route path='/events/:id?' element={<ThemeProvider><Details/></ThemeProvider>} />
          <Route path='/error/:errorId?' element={<h1>Error Occoured</h1>} />
          <Route path='*' element={<h1>Error 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;