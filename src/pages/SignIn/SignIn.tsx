import { PageContainer, PageTitle } from "../../components/MainComponents"
import { PageArea, ErrorMessage } from "./SignIn.styles"
import { Link } from "react-router-dom"
import logo from '../../assets/bird-logo.png'
import { useForm } from "react-hook-form"


type FormData = {
  email:string;
  password:string;
  remember:boolean;
}

export const SignIn = () => {

  const {register, handleSubmit, formState:{errors} } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data)) 

  return(
    <PageContainer>
      <PageArea>
        <div className="container--description">
          <img src={logo} alt="logo_Bird" width={'80px'}/>
          <PageTitle>Acesse a sua Conta</PageTitle>
        </div>

        <form onSubmit={onSubmit}>
          <label  htmlFor="email">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input {...register('email', {required: 'O email é obrigatório'})} id="email" type="email" />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>
          </label>
          <label  htmlFor="password">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input {...register('password', {required: 'A senha é obrigatória'})} id="password" type="password" />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>
          </label>
          <label className="area--remember" htmlFor="remember">
            <div className="area--title">Lembrar Senha</div>
            <div className="area--input">
              <input {...register('remember')} id="remember" name="remember" type="checkbox" />
            </div>
          </label>
          <div className="button--area">
            <button type="submit">Entrar</button>
          </div>
        </form>

        <hr/>
        <p>Não tem uma conta? <Link to={'/signup'}>Cadastre-se</Link>  </p>
      </PageArea>
    </PageContainer>
  )
}