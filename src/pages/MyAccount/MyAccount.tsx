import { useEffect, useState } from "react"
import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponents"
import Footer from "../../components/partials/Footer/Footer"
import Header from "../../components/partials/Header/Header"
import { MyAccountPageArea, UserModalContainer,NoAds } from "./MyAccount.styles"
import { useApi } from "../../Services/Api"
import { User } from "../../types/User"
import AdListItem from "../../components/partials/AdListItem/AdListItem"
import ReactModal from "react-modal"
import { useForm } from "react-hook-form"

type FormData = {
   name?:string;
   email?:string;
   state?:string;
   password?:string;
 };

 type StateType = {
   _id:string;
   name:string;
 }

export const MyAccount = () =>{
   
   const [data, setData] = useState<User>()
   const [modalEditUser, setModalEditUser] = useState(false)
   const [disable, setDisable] = useState(false)
   const [states, setStates] = useState<StateType[]>()

   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

   const api = useApi()

   console.log(data)

   const onSubmit = handleSubmit( async formData => {
      console.log(formData)
      setDisable(true)

      if(formData.name === data?.name) delete formData.name
      if(formData.email === data?.email) delete formData.email
      if(formData.state === data?.state){
         delete formData.state
      } else {
         const newState = states?.find(item => item.name === formData.state)
         formData.state = newState?._id
      }
      if(formData.password === '') delete formData.password

      if(Object.keys(formData).length > 0){
         console.log('entrou')
         console.log(formData)
         const json = await api.updateUserInfo(formData)

         if(!json.error){
            setDisable(false)
            setModalEditUser(false)
            window.location.reload()
            return
         }else{
            console.log(json.error)
         }

      }else{
         console.log('não entrou')
         console.log(formData)
         setDisable(false)
         setModalEditUser(false)
         return
      }
   })

   const editUserInfo = () => {
      setModalEditUser(true)
   }

   const closeModalEditUser = () => {
      setModalEditUser(false)
   }

   useEffect(()=>{
      const getMe = async () => {
         const json = await api.getMe()
         setData(json)
      }
      getMe()
   },[api])

   useEffect(()=>{
      const getStates = async () => {
         const json = await api.getStates()
         setStates(json)
      }
      getStates()
   },[api])
      
   return (
      <>
         <Header/>
         <PageContainer>
            <MyAccountPageArea>
               <div className="left-side">
                  <div className="user-data-container">
                     <div>Olá, {data?.name}!</div>
                     <div className="separator"></div>
                     <div className="user-data-info">
                        Email: 
                        <span> {data?.email}</span>
                     </div>
                     <div className="user-data-info">
                        Total de Anúncios:
                        <span> {data?.ads.length}</span>
                     </div>
                     <a onClick={editUserInfo} className="user-data-info user-data-link">
                        Editar informações
                     </a>
                     <ReactModal 
                        isOpen={modalEditUser}
                        onRequestClose={closeModalEditUser}
                        preventScroll={true}
                        shouldCloseOnOverlayClick={false}
                        style={
                           {
                              content: {
                                 top: '50%',
                                 left: '50%',
                                 right: 'auto',
                                 bottom: 'auto',
                                 marginRight: '-50%',
                                 transform: 'translate(-50%, -50%)',
                                 borderRadius:"15px",
                                 overflow:"auto",
                                 maxHeight:"90vh",
                                 minWidth:'40vw',
                                 zIndex:'999',
                              },
                              overlay:{
                                 backgroundColor:'rgb(0,0,0,0.6)',
                                 zIndex:'999',
                              }
                           }
                        }
                     >
                        <UserModalContainer>
                           <h2 className="titulo">Edite seus dados</h2>
                           <form onSubmit={onSubmit}>
                              <label  htmlFor="name">
                                 <div className="area--title">Nome</div>
                                 <div className="area--input">
                                    <input 
                                       {...register('name', {required: 'O nome é obrigatório'})} 
                                       id="name" 
                                       type="text" 
                                       disabled={disable}
                                       defaultValue={data?.name}
                                    />
                                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                                 </div>
                              </label>
                              <label  htmlFor="email">
                                 <div className="area--title">Email</div>
                                 <div className="area--input">
                                    <input 
                                       {...register('email', {required: 'O email é obrigatório'})} 
                                       id="email" 
                                       type="text" 
                                       disabled={disable}
                                       defaultValue={data?.email}
                                    />
                                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                                 </div>
                              </label>
                              <label  htmlFor="state">
                                 <div className="area--title">Estado</div>
                                 <div className="area--input">
                                    <select 
                                       {...register('state', {required: 'O estado é obrigatória'})} 
                                       id="state" 
                                       disabled={disable}
                                       defaultValue={data?.state}
                                    >
                                       {
                                       states &&
                                          states.map((item) => (
                                             <option key={item._id} value={item.name}>{item.name}</option>
                                          ))
                                       }
                                    </select>
                                    {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}
                                 </div>
                              </label>
                              <label  htmlFor="password">
                                 <div className="area--title">Nova senha</div>
                                 <div className="area--input">
                                    <input 
                                       {...register('password')} 
                                       id="password" 
                                       type="password" 
                                       disabled={disable}
                                       defaultValue={''}
                                    />
                                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                                 </div>
                              </label>
                              <div className="button--area">
                                 <button type="submit" disabled={disable}>Salvar e modificar</button>
                              </div>
                           </form>
                           <button onClick={closeModalEditUser} className="close-button">Fechar sem  modificar</button>
                        </UserModalContainer>
                     </ReactModal>
                  </div>
               </div>
               <div className="right-side">
                  <PageTitle>Meus Anúncios</PageTitle>
                  <div className="ads-box-container">
                     <div>
                        <ul className="ads-list">
                           {
                              data?.ads && (

                                 data?.ads.length > 0 ?

                                    data?.ads.map((item, index)=>(
                                       <AdListItem key={index} data={item._doc}/>
                                    ))

                                 :

                                    <NoAds>Não há anúncios publicados</NoAds>
                              )
                           }
                        </ul>
                     </div>
                  </div>
               </div>
            </MyAccountPageArea>
         </PageContainer>
         <Footer/>
      </>
   )
}