import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFoutd";
import { SignIn } from "./pages/SignIn/SignIn";
import { Signup } from "./pages/Signup/Singup";
import { AdPage } from './pages/AdPage/AdPage'
import { Api } from "./Services/Api";
import { RequireAuth } from "./helpers/RequireAuth";
import { AddAd } from "./pages/AddAd/AddAd";
import { Ads } from "./pages/Ads/Ads";
import { MyAccount } from "./pages/MyAccount/MyAccount";

export const routes = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<NotFound/>
  },
  {
    path:"/about",
    element:<div>Sobre</div>,
  },
  {
    path:"/signin",
    element:<SignIn/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/ad/:id",
    element:<AdPage/>,
    loader: async ({params}) => {
      try{
        const json = Api.getAd(params)
        return json
     }catch (error){
        console.error(error)
     }
    },
    errorElement:<NotFound/>
  },
  {
    path:"post-an-ad",
    element:
      <RequireAuth>
        <AddAd/>
      </RequireAuth>,
  },
  {
    path:"/ads",
    element:<Ads/>
  },
  {
    path:"/my-account",
    element:
    <RequireAuth>
      <MyAccount/>
    </RequireAuth>
  },

])






