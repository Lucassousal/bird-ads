import { Link } from "react-router-dom";
import { Ul } from "./RightNav.styles"
import { ActionButton, AddButton } from "../../Header/Header.styles";

type Props = {
   open: boolean;
   logged:boolean;
   click: () => void;
}


export const RightNav = ({open, logged, click}:Props) => {

   return (
      <Ul open={open}>
         {
            logged === true ?

            <>
               <li>
               <Link to={'/my-account'}>
                  <ActionButton $primary>Minha Conta</ActionButton>
               </Link>
               </li>
               <li>
               <ActionButton onClick={click} $primary>Sair</ActionButton>
               </li>
               <li>
               <Link to={'/post-an-ad'}>
                  <AddButton>Postar um anúncio</AddButton>
               </Link>
               </li>
            </>

            :

            <>
               <li>
               <Link to={'/signin'}>
                  <ActionButton $primary>Login</ActionButton>
               </Link>
               </li>
               <li>
               <Link to={'/signup'}>
                  <ActionButton>Cadastrar</ActionButton>
               </Link>
               </li>
               <li>
               <Link to={'/post-an-ad'}>
                  <AddButton>Postar um anúncio</AddButton>
               </Link>
               </li>
            </>

         }

      </Ul>
   )
}