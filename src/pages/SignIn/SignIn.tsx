import { PageContainer, PageTitle, GeralErrorMessage } from "../../components/MainComponents"
import { PageArea, ErrorMessage } from "./SignIn.styles"
import { Link } from "react-router-dom"
import logo from '../../assets/bird-logo.png'
import { useForm } from "react-hook-form"
import { useApi } from "../../Services/Api"
import { useState } from "react"
import { doLogin } from "../../helpers/AuthHandler"

type FormData = {
  email:string;
  password:string;
  remember:boolean;
}

export const SignIn = () => {

  const [disable, setDisable] = useState(false)
  const [error, setError] = useState('')
  const {register, handleSubmit, formState:{errors} } = useForm<FormData>();

  const api = useApi();
  
  const onSubmit = handleSubmit( async (data) => {

    setDisable(true)
    setError('')

    const json = await api.login(data.email, data.password)
  
    if(json.error){
      setError(json.error)
    }else{
      doLogin(json.token, data.remember)
      window.location.href='/'
    }
  
    setDisable(false)

  }) 

  return(
    <PageContainer>
      <PageArea>
        
        {
          error &&
          <GeralErrorMessage>{error}</GeralErrorMessage>
        }

        <div className="container--description">
          <img src={logo} alt="logo_Bird" width={'80px'}/>
          <PageTitle>Acesse a sua Conta</PageTitle>
        </div>

        <form onSubmit={onSubmit}>
          <label  htmlFor="email">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input 
                {...register('email', {required: 'O email é obrigatório'})} 
                id="email" 
                type="email" 
                disabled={disable}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>
          </label>
          <label  htmlFor="password">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input 
                {...register('password', {
                  required: 'A senha é obrigatória',
                  })
                } 
                id="password" 
                type="password" 
                disabled={disable}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>
          </label>
          <label className="area--remember" htmlFor="remember">
            <div className="area--title">Lembrar Senha</div>
            <div className="area--input">
              <input 
                {...register('remember')} 
                id="remember" 
                type="checkbox" 
                disabled={disable}
              />
            </div>
          </label>
          <div className="button--area">
            <button type="submit" disabled={disable}>Entrar</button>
          </div>
        </form>

        <hr/>
        <p>Não tem uma conta? <Link to={'/signup'}>Cadastre-se</Link> </p>
        <p className="home-link">Voltar para <Link to={'/'}>Home</Link> </p>
      </PageArea>
    </PageContainer>
  )
}