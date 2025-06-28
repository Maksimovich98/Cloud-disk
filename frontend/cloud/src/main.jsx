// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AuthProvider from './context/AuthProvider'   // 1) импорт провайдера

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <AuthProvider>   {/* 2) обёртка провайдера */}
    <App />
  </AuthProvider>
)
