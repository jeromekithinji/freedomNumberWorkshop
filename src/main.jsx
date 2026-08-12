import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ViewSubmissionsPage } from './pages/view-submissions-page.jsx'

export const Page = window.location.pathname === '/view/submissions'
  ? ViewSubmissionsPage
  : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
