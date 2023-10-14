import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ShapeProvider } from './ShapeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShapeProvider><App /></ShapeProvider>
  </React.StrictMode>,
)
