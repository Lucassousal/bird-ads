import { useEffect, useState } from "react";
import Header from "../../components/partials/Header/Header"
import { useApi } from "../../Services/Api";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage, GeralErrorMessage, PageContainer, PageTitle } from "../../components/MainComponents";
import { PageArea } from "./AddAd.styles";
import { CategoryType } from "../../types/Category";
import { createNumberMask } from "text-mask-addons";
import MaskedInput from "react-text-mask";
import { useNavigate } from "react-router-dom";


type FormData = {
   title:string;
   category:string;
   price:string;
   negotiable:boolean;
   description:string;
   images:string;
 };


export const AddAd = () => {

  const [disable, setDisable] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<CategoryType[]>([])
  const {register, control, handleSubmit, formState:{errors} } = useForm<FormData>();

  const api = useApi();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    setDisable(true)
    setError('')

    const fData = new FormData()
    fData.append('title', data.title)
    fData.append('price', data.price.slice(3))
    fData.append('priceneg', data.negotiable.toString())
    fData.append('desc', data.description)
    fData.append('cat', data.category)
    
    if(data.images.length > 0){
       for(let i = 0; i < data.images.length; i++){
         fData.append('img', data.images[i] )
       }
    }

    const json = await api.addAd(fData)

    if(!json.error){
      navigate(`/ad/${json.id}`)
      return
    } else{
      setError(json.error)
    }

   console.log(fData.get('price'))
    setDisable(false)
  }) 

  const priceMask = createNumberMask({
      prefix:"R$ ",
      includeThousandsSeparator:true,
      thousandsSeparatorSymbol:'.',
      allowDecimal:true,
      decimalSymbol:','
  })

  useEffect(()=> {
      const getCategories = async () => {
         const categories = await api.getCategories()
         setCategories(categories)
      }
      getCategories();
  },[api])

   return(
      <>
         <Header/>
         <PageContainer>
            <PageArea>
            
            {
               error &&
               <GeralErrorMessage>{error}</GeralErrorMessage>
            }

            <div className="container--description">
               <PageTitle>Poste um anúncio</PageTitle>
            </div>

            <form onSubmit={onSubmit}>
               <label  htmlFor="title">
                  <div className="area--title">Titulo</div>
                  <div className="area--input">
                     <input 
                        {...register('title', {required: 'O título é obrigatório'})} 
                        id="title" 
                        type="text" 
                        disabled={disable}
                     />
                     {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                  </div>
               </label>
               <label  htmlFor="category">
                  <div className="area--title">Categoria</div>
                  <div className="area--input">
                     <select {...register('category', {required: 'A categoria é obrigatória'})} id="category" disabled={disable}>
                        <option value=""></option>
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
                     
                     {/* <input 
                        {...register('price', {required: 'O Preço é obrigatório'})} 
                        id="price" 
                        type="text" 
                        disabled={disable}
                     /> */}
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
                     />
                     {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                  </div>
               </label>
               <label  htmlFor="images">
                  <div className="area--title">Imagens (1 ou mais)</div>
                  <div className="area--input">
                     <input 
                        {...register('images', {required: 'A imagem é obrigatória'})} 
                        id="images" 
                        type="file"
                        disabled={disable}
                        multiple
                        accept="image/png, image/jpeg"
                     />
                     {errors.images && <ErrorMessage>{errors.images?.message}</ErrorMessage>}
                  </div>
               </label>
               <div className="button--area">
                  <button type="submit" disabled={disable}>Adicionar Anúncio</button>
               </div>
            </form>

            </PageArea>
         </PageContainer>
      </>
   )
}