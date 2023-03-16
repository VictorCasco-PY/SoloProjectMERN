import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes/index'
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import ContextProvider from './context/FirstContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </CookiesProvider>
)
