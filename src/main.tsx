import ReactDOM from 'react-dom/client'
import { AppStyleProvider, appTheme } from './style/Style'
import './style/index.css'
import App from './components/App'

const rootRef: Element | null  = document.querySelector ('#root')
const root: ReactDOM.Root = ReactDOM.createRoot (rootRef as Element)



root.render (
  <AppStyleProvider theme= {appTheme} >
    <App />
  </AppStyleProvider>
)

