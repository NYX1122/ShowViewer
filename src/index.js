import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import theme from './theme.js';

import { Box, ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';
import reportWebVitals from './reportWebVitals';

import CastPage from './pages/CastPage';
import MainShowPage from './pages/MainShowPage';

const rootElement = document.getElementById('root');

render(
  <Box className='App' sx={{ minHeight: '100vh' }}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path='Cast' element={<CastPage />} />
            <Route path='Show' element={<MainShowPage />} />
            <Route path='*' element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Box>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
