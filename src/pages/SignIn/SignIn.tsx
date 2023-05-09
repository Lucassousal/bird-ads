import { PageContainer, PageTitle } from "../../components/MainComponents"
import { PageArea } from "./SignIn.styles"
import { Link } from "react-router-dom"
import logo from '../../assets/bird-logo.png'


export const SignIn = () => {

  return(
    <PageContainer>
      <PageArea>
        <div className="container--description">
          <img src={logo} alt="logo_Bird" width={'80px'}/>
          <PageTitle>Acesse a sua Conta</PageTitle>
        </div>
        <form action="">
          <label  htmlFor="email">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input id="email" name="email" type="email" />
            </div>
          </label>
          <label  htmlFor="password">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input id="password" name="password" type="password" />
            </div>
          </label>
          <label className="area--remember" htmlFor="remember">
            <div className="area--title">Lembrar Senha</div>
            <div className="area--input">
              <input id="remember" name="remember" type="checkbox" />
            </div>
          </label>
          <div className="button--area">
            <button>Entrar</button>
          </div>
        </form>
        <hr/>
        <p>Não tem uma conta? <Link to={'/signup'}>Cadastre-se</Link>  </p>
      </PageArea>
    </PageContainer>
  )
}