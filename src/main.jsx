import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ThirdwebProvider } from "@thirdweb-dev/react";



// identifier our frontend
const clientId = 'fcde43e51917e330822e29b0b083697a';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider activeChain={'mumbai'} clientId={clientId} autoConnect={true}>
    <App />
  </ThirdwebProvider>
)
