import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Template } from './components/MainComponents'
import { routes } from './routes'
import { ToastContainer } from 'react-toastify'

const App = () => {

  return (
      <Template>
          <RouterProvider router={routes}/>
          <ToastContainer autoClose={3000}/>
      </Template>
  )
}

export default App
