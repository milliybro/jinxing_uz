import { StrictMode } from 'react'
import { App as AntApp } from 'antd'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AntApp>
      <App />
    </AntApp>
  </StrictMode>,
)
