import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'
import './index.css'
import App from './app'

const convexUrl = import.meta.env.VITE_CONVEX_URL
const application = <App convexConfigured={Boolean(convexUrl)} />

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    {convexUrl ? (
      <ConvexAuthProvider client={new ConvexReactClient(convexUrl)}>
        {application}
      </ConvexAuthProvider>
    ) : application}
  </StrictMode>,
)
