import { PageContainer, PageTitle, GeralErrorMessage } from '../../components/MainComponents'
import { useForm } from "react-hook-form";
import { PageArea, ErrorMessage } from "./Singup.styles" 
import { Link } from 'react-router-dom';
import logo from '../../assets/bird-logo.png'
import { useEffect, useState } from 'react';
import { useApi } from '../../Services/Api';
import { doLogin } from '../../helpers/AuthHandler';

type FormData = {
  name:string;
  email:string;
  stateLoc:string;
  password:string;
  confirmPassword:string;
}

type StateList = {
  _id:string;
  name:string;
}


export const Signup = () => {
  
  const [disable, setDisable] = useState(false)
  const [error, setError] = useState('')
  const [stateList, setStateList] = useState<StateList[]>([])

  const api = useApi();

  const {register, handleSubmit, formState:{errors} } = useForm<FormData>();
  
  const onSubmit = handleSubmit( async (data) => {
    
    setDisable(true)
    setError('')

    if(data.password !== data.confirmPassword){
      setError('As senhas são diferentes')
      setDisable(false)
      return
    }

    const json = await api.register(data.name, data.email, data.password, data.stateLoc);

    if(json.error){
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href='/'
    }

    setDisable(false)

  })

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates();
      setStateList(sList);
    }

    getStates()
  },[api])

  return(
    <PageContainer>
      <PageArea>
        
        {
          error &&
          <GeralErrorMessage>{error}</GeralErrorMessage>
        }

        <div className="container--description">
          <img src={logo} alt="logo_Bird" width={'80px'}/>
          <PageTitle>Crie a sua Conta. É grátis!</PageTitle>
        </div>

        <form onSubmit={onSubmit}>
          <label  htmlFor="name">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input 
                {...register('name', {required: 'O nome é obrigatório'})} 
                id="name" 
                type="text" 
                disabled={disable}
              />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
          </label>
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
          <label  htmlFor="stateLoc">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select 
                {...register('stateLoc', {required: 'O estado é obrigatório'})} 
                id="stateLoc" 
                disabled={disable}
              >
                <option value=''></option>
                {stateList.map(item => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                )
                )}
              </select>
              {errors.stateLoc && <ErrorMessage>{errors.stateLoc.message}</ErrorMessage>}
            </div>
          </label>
          <label  htmlFor="password">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input 
                {...register('password', {
                  required: 'A senha é obrigatória', 
                  minLength:{value:6, message:"A senha deve ter no minimo 6 dígitos"}
                  })
                } 
                id="password" 
                type="password" 
                disabled={disable}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>
          </label>
          <label  htmlFor="confirmPassword">
            <div className="area--title">Confirme a senha</div>
            <div className="area--input">
              <input 
                {...register('confirmPassword', {
                  required: 'A confirmação da senha é obrigatória', 
                  minLength:{value:6, message:"A senha deve ter no minimo 6 dígitos"}
                  })
                } 
                id="confirmPassword" 
                type="password" 
                disabled={disable}
              />
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
            </div>
          </label>
          <div className="button--area">
            <button type="submit" disabled={disable}>Cadastrar</button>
          </div>
        </form>

        <hr/>
        <p>Já tem uma conta? <Link to={'/signin'}>Entrar</Link>  </p>
        <p className="home-link">Voltar para <Link to={'/'}>Home</Link> </p>
      </PageArea>
    </PageContainer>
  )
}