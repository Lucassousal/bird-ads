import { PageContainer, PageTitle} from '../../components/MainComponents'
import { useForm } from "react-hook-form";
import { PageArea, ErrorMessage } from "./Singup.styles" 
import { Link } from 'react-router-dom';
import logo from '../../assets/bird-logo.png'
import { useEffect, useState } from 'react';
import { useApi } from '../../Services/Api';
import { doLogin } from '../../helpers/AuthHandler';
import { toast } from 'react-toastify'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type StateList = {
  _id:string;
  name:string;
}

export const Signup = () => {
  
  const schema = z.object({
    name: z.string()
      .nonempty('O nome é obrigatório')
      .min(6, 'Insira nome e sobrenome'),
    email: z.string()
      .nonempty('O email é obrigatório')
      .email('Formato de email inválido'),
    stateLoc: z.string()
      .nonempty('O estado é obrigatório'),
    password: z.string()
      .nonempty('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .regex(/^(?=.*[A-Z])/, 'Deve ter uma letra maiúscula')
      .regex(/(?=.*[0-9])/, 'Deve ter um número')
      .regex(/(?=.*[!@#$&*])/, 'Deve ter um caractere especial')
      .regex(/(?=.*[a-z])/, 'Deve ter uma letra minúscula'),
    confirmPassword: z.string()
      .nonempty('A confirmação da senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),

  })
  .refine((data) => data.password === data.confirmPassword, {
    message:'As senha não são iguais',
    path:['confirmPassword']
  })

  type TypeSchema = z.infer<typeof schema>

  const [disable, setDisable] = useState(false)
  const [stateList, setStateList] = useState<StateList[]>([])

  const api = useApi();

  const {register, handleSubmit, formState:{errors} } = useForm<TypeSchema>({resolver: zodResolver(schema)});
  
  const onSubmit = handleSubmit( async (data) => {

    setDisable(true)

    const json = await api.register(data.name, data.email, data.password, data.stateLoc);

    if(json.error.email || json.error.state){
      json.error.email ? toast.error(json.error.email.msg) : toast.error(json.error.state.msg)
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
        <div className="container--description">
          <img src={logo} alt="logo_Bird" width={'80px'}/>
          <PageTitle>Crie a sua Conta. É grátis!</PageTitle>
        </div>

        <form onSubmit={onSubmit}>
          <label  htmlFor="name">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input 
                {...register('name')} 
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
                {...register('email')} 
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
                {...register('stateLoc')} 
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
                {...register('password')} 
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
                {...register('confirmPassword')} 
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