import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import  './index.css'
import { AuthProvider } from './context/authcontext'
import { AgendarProvider } from './context/agendarContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AgendarProvider> 
          <App />
      </AgendarProvider>
    </AuthProvider>
  </React.StrictMode>,
)
