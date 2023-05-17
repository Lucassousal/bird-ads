import { Navigate} from "react-router-dom"
import { isLogged } from "./AuthHandler"

type Props = {
   children: JSX.Element
}

export const RequireAuth = ({children}:Props) => {
   
   const isAuth = isLogged()   
   
   if(!isAuth) {
      console.log('entrou')
      return <Navigate to={'/signin'}/>
   }

   return children
}