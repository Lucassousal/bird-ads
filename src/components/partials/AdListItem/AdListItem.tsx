import { ContainerAd, ModalContainer, NoImages } from "./AdListItem.styles"
import { formatDate } from "../../../helpers/formateDate";
import { useState } from "react";
import { useApi } from "../../../Services/Api";
import { CategoryType } from "../../../types/Category";
import ReactModal from 'react-modal'
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "../../MainComponents";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import {toast} from 'react-toastify'

const BASE_URL = import.meta.env.VITE_REACT_API_URL

type Props = {
   data:{
      _id:string;
      images:{
         url?:string,
         default?:boolean
      }[],
      dateCreated:string,
      title:string,
      category:string,
      price:number,
      priceNegotiable:boolean,
      description:string,
      views:number,
      state:string,
      status:string;
   },
   categories:CategoryType[]
}

type FormData = {
   title:string;
   category:string;
   price:string;
   negotiable:boolean;
   status: boolean;
   description:string;
   images:string;
};

type sendDataType = {
   title?: string;
   status?: string;
   cat?: string;
   price?: string;
   priceneg?: string;
   desc?: string;
   images?: {
      url?: string | undefined;
      default?: boolean | undefined;
   }[];
}

ReactModal.setAppElement('#root')

const AdListItem = ({data, categories}:Props) => {
   
   const priceMask = createNumberMask({
      prefix:"R$ ",
      includeThousandsSeparator:true,
      thousandsSeparatorSymbol:'.',
      allowDecimal:true,
      decimalSymbol:','
  })

   const [modaEditAd, setModalEditAd] = useState(false)
   const [disable, setDisable] = useState(false)
   const [currentImages, setCurrentImages] = useState(data.images)

   const api = useApi()

   const { register, control , handleSubmit, formState: { errors } } = useForm<FormData>();


   const onSubmit = handleSubmit( async dat => {
      
      let updateInfo = false;
      let updateNewImages = false;
      
      setDisable(true)
      
      const sendData:sendDataType = {
         title: dat.title,
         status: `${dat.status}`,
         cat: findSlugCategory(dat.category),
         price: dat.price,
         priceneg: `${dat.negotiable}`,
         desc: dat.description,
         images: currentImages,
      }

      if(sendData.title === data.title) delete sendData.title
      if(sendData.status === data.status) delete sendData.status
      if(dat.category === data.category) delete sendData.cat
      if(parseFloat(dat.price.replace(',','.')) === data.price) delete sendData.price
      if(sendData.priceneg === JSON.stringify(data.priceNegotiable)) delete sendData.priceneg
      if(sendData.desc === data.description) delete sendData.desc
      if(JSON.stringify(sendData.images) === JSON.stringify(data.images)) delete sendData.images

      if(Object.keys(sendData).length > 0){

         if (currentImages.length > 0) currentImages[0].default = true

         const json = await api.updateInfoAd(sendData, data._id)

         if(!json.error){
            updateInfo = true;
         } else{
            toast.error(json.error)
         }
      }
 
      if(dat.images.length > 0){

         if (currentImages.length > 0) currentImages[0].default = true
         
         const fData = new FormData()

         for(let i = 0; i < dat.images.length; i++){
            fData.append('img', dat.images[i] )
         }

         const jsonAddImages = await api.updateImageAd(fData, data._id)

         if(!jsonAddImages.error){
            updateNewImages = true
         }else{
            toast.error(jsonAddImages.error)
         }

      }

      if (updateInfo || updateNewImages){

         setDisable(false)
         setModalEditAd(false)
         toast.success('Alterações feitas com sucesso!')
         setTimeout(()=>{
            window.location.reload()
         },3000)
         return
      } 
        

      setDisable(false)
      setModalEditAd(false)
      toast.info('Nenhuma alteração realizada')
      return
   })

   const RemoveCurrentImage = (url?:string) => {
      const newArr = currentImages.filter((item) => item.url !== url)
      setCurrentImages(newArr)
   }

   const findSlugCategory = (id:string):string => {
      const category = categories?.find(item => item._id === id)
      return category?.slug ?? ''
   }

   const openModalEditAd = () => {
      setModalEditAd(true)
   }

   const closeModalEditAd = () => {
      setModalEditAd(false)
   }

   const setNameCategory = ():string => {
      const categ = categories?.find((item) =>{
         return item._id == data.category
      })

      return categ?.name ?? ''
   }

   

   return(
      <ContainerAd>
         <div className="left-side-AdList">
           
            {
            data.images.length == 0 ?
               <div className="container-image">
                  <img  src={`${BASE_URL}/media/default.jpg`} alt="" />
               </div>
            :
                            
               <div className="container-image">
                  <img  src={`${BASE_URL}/media/${data.images[0].url}`} alt="" />
               </div>
            }

         </div>
         <div className="right-side-AdList">
            <div className="right-side-AdList-top">
               <span className="ad-title">{data.title}</span>
               <div>
                  {
                     data.status === 'true' &&
                     <span className="status-active">Ativo</span>
                  }
                  {
                     data.status === 'false' &&
                     <span className="status-inactive">Inativo</span>
                  }
               </div>
            </div>
            <div className="right-side-AdList-middle">
               <p>Categoria: {setNameCategory()}</p>
               <p>Preço: R${data.price}</p>
               <p>Preço negociável: {data.priceNegotiable ? 'Sim' : 'Não'}</p>
               <p>Descrição: {data.description}</p>
               <p>Data de criação: {formatDate(data.dateCreated)}</p>
            </div>
            <div className="right-side-AdList-bottom">
               <a onClick={openModalEditAd}>Editar</a>
            </div>
            <ReactModal 
               isOpen={modaEditAd}
               onRequestClose={closeModalEditAd}
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
                        borderRadius:"15px 0 0 15px",
                        overflow:"auto",
                        maxHeight:"90vh",
                        minWidth:'50vw',
                        zIndex:'999',
                     },
                     overlay:{
                        backgroundColor:'rgb(0,0,0,0.6)',
                        zIndex:'999',
                     }
                  }
               }
            >
               <ModalContainer>
                  <h2 className="titulo">Edite o seu anúncio</h2>
                  <form onSubmit={onSubmit}>
                     <label  htmlFor="title">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                           <input 
                              {...register('title', {required: 'O título é obrigatório'})} 
                              id="title" 
                              type="text" 
                              disabled={disable}
                              defaultValue={data.title}
                           />
                           {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                        </div>
                     </label>
                     <label  htmlFor="category">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                           <select 
                              {...register('category', {required: 'A categoria é obrigatória'})} 
                              id="category" 
                              disabled={disable}
                              defaultValue={data.category}
                           >
                              {
                              categories &&
                                 categories.map((item) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                 ))
                              }
                           </select>
                           {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
                        </div>
                     </label>
                     <label  htmlFor="price">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                           <Controller
                              control={control}
                              name="price"
                              rules={{required: 'O Preço é obrigatório'}}
                              defaultValue={`${data.price}`.replace('.',',')}
                              render={({field}) => (
                                 <MaskedInput 
                                    {...field}
                                    mask={priceMask}
                                    placeholder="R$ "
                                    disabled={disable}
                                    id="price"
                                 />
                              )}
                           />
                           {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
                        </div>
                     </label>
                     <label className="area--negotiable" htmlFor="negotiable">
                        <div className="area--title">Preço negociável</div>
                        <div className="area--input">
                           <input 
                              {...register('negotiable')} 
                              id="negotiable" 
                              type="checkbox" 
                              disabled={disable}
                              defaultChecked={data.priceNegotiable}
                           />
                        </div>
                     </label>
                     <label className="area--negotiable" htmlFor="status">
                        <div className="area--title">Ativar anúncio</div>
                        <div className="area--input">
                           <input 
                              {...register('status')} 
                              id="status" 
                              type="checkbox" 
                              disabled={disable}
                              defaultChecked={data.status === 'true'}
                           />
                        </div>
                     </label>
                     <label  htmlFor="description">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                           <textarea 
                              {...register('description', {required: 'A descrição é obrigatória'})} 
                              id="description" 
                              disabled={disable}
                              defaultValue={data.description}
                           />
                           {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                        </div>
                     </label>

                     <div>
                        <label className="area--title">Imagens</label>
                        <div className="area-images">
                           {
                              currentImages.length > 0 ?

                                 currentImages.map((item, index)=>(
                                    <div key={index} className="image-container">
                                       <span onClick={() => RemoveCurrentImage(item.url)} className="remove-image">&#215;</span>
                                       <img src={`${BASE_URL}/media/${item.url}`} alt="" />
                                    </div>
                                 ))

                              :

                              <NoImages>O produto não tem imagens</NoImages>
                           }
                        </div>
                     </div>

                     <label  htmlFor="images">
                        <div className="area--title">Adicione novas imagens (1 ou mais)</div>
                        <div className="area--input">
                           <input 
                              {...register('images')} 
                              id="images" 
                              type="file"
                              disabled={disable}
                              multiple
                              accept="image/png, image/jpeg"
                           />
                        </div>
                     </label>
                     <div className="button--area">
                        <button type="submit" disabled={disable}>Salvar e modificar</button>
                     </div>
                  </form>
                  <button onClick={closeModalEditAd} className="close-button">Fechar sem  modificar</button>
               </ModalContainer>
            </ReactModal>
         </div>
      </ContainerAd>
   )
}

export default AdListItem