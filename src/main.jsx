import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ThemeProvider } from './contexts/ThemeContext'
import { CartProvider } from "./contexts/CartContext"
import { UsersProvider } from "./contexts/UsersContext";
import { PurchasedProvider } from "./contexts/PurchasedContext";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <PurchasedProvider>
          <UsersProvider>                {/* ADD THIS */}
            <RouterProvider router={router} />
          </UsersProvider>
        </PurchasedProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
)