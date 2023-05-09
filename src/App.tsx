import './App.css'
import { BrowserRouter} from 'react-router-dom'
import { Template } from './components/MainComponents'
import Header from './components/partials/Header/Header'
import { MainRoutes } from './routes'

const App = () => {

  return (
    <BrowserRouter>
      <Template>
          <Header/>
          <MainRoutes/>
      </Template>
    </BrowserRouter>

  )
}

export default App
