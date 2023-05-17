import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Template } from './components/MainComponents'
import { routes } from './routes'
const App = () => {

  return (
      <Template>
          <RouterProvider router={routes}/>
      </Template>
  )
}

export default App
