import { HeaderArea, ActionButton, AddButton } from "./Header.styles"
import { Link } from "react-router-dom"
import logo from '../../../assets/bird-logo.png'
import { isLogged, doLogout } from "../../../helpers/AuthHandler"
import Media from "react-media"
import { BurguerMenu } from "../BurguerMenu/BurguerMenu"

const Header = () => {

  const logged = isLogged();
  
  const handleLogout = () => {
    doLogout();
    window.location.href='/';
  }

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to={'/'}>
            <img src={logo} alt="logo_Bird" width={'60px'} />
            <span className="logo-name">Bird Anúncios</span>
          </Link>
        </div>
        <nav className="defaultNav">
          <ul className="defaultUl">
            {logged ?
              <>
                <Media query='(max-width: 768px)' render={() =>(
                  <BurguerMenu click = {handleLogout} logged={logged}/>
                )}/>
                <Media query='(min-width: 769px)' render={() =>(
                  <>
                    <li>
                      <Link to={'/my-account'}>
                        <ActionButton $primary>Minha Conta</ActionButton>
                      </Link>
                    </li>
                    <li>
                      <ActionButton onClick={handleLogout} $primary>Sair</ActionButton>
                    </li>
                    <li>
                      <Link to={'/post-an-ad'}>
                        <AddButton>Postar um anúncio</AddButton>
                      </Link>
                    </li>
                  </>
                )}/>
              </>
            :
              <>
                <Media query='(max-width: 768px)' render={() =>(
                    <BurguerMenu click = {handleLogout} logged={logged}/>
                )}/>
                
                <Media query='(min-width: 769px)' render={() =>(
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
                )}/>
              </>
            }
          </ul>
        </nav>
      </div>
    </HeaderArea>
  )
}

export default Header