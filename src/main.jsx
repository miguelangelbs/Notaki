import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@radix-ui/themes/styles.css"
import { AppWrapper } from './components/AppWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AppWrapper />
  </StrictMode>,
)
