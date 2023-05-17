import { useApi } from "../Services/Api"

export const LoadProduct = async ({params}) => {
   
   const api = useApi()

   try{
      const response = await api.getAd(params)
      return response
   }catch(error){
      console.error(error)
   }
}
