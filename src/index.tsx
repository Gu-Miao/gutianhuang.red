/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App'
import './index.less'

const root = document.getElementById('root') as HTMLDivElement

render(() => <App />, root)
