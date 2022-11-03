import ReactDOM from 'react-dom/client'
import App from "./App";

const rootRef: Element | null  = document.querySelector ('#root')
const root = ReactDOM.createRoot (rootRef as Element)

root.render (<> <App/> </>)
