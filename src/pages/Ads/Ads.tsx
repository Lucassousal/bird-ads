import { useEffect, useState } from "react"
import { PageArea } from "./Ad.styles"
import { useApi } from "../../Services/Api";
import { CategoryType } from "../../types/Category";
import { AdsType } from "../../types/Ads";
import Header from "../../components/partials/Header/Header";
import { PageContainer } from "../../components/MainComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { AdItem } from "../../components/partials/AdItem/AdItem";
import { ClipLoader } from "react-spinners";

 type StateType = {
   _id:string;
   name:string;
 }

 let timer;

export const Ads = () => {

   const api = useApi()
   const navigate = useNavigate()

   const useQueryString = () => {
      return new URLSearchParams(useLocation().search)
   }
   const query = useQueryString();

   const [stateList, setStateList] = useState<StateType[]>([])
   const [categories, setCategories] = useState<CategoryType[]>([])
   const [adsList, setAdsList] = useState<AdsType[]>([])
   
   const [q, setQ] = useState(query.get('q') !== null ? query.get('q') : '')
   const [cat, setCat] = useState(query.get('cat') !== null ? query.get('cat') : '')
   const [state, setState] = useState(query.get('state') !== null ? query.get('state') : '')

   const [resultOpacity, setResultOpacity] = useState(0.3)
   const [loading, setLoading] = useState(true)

   const getAdsList = async () => {
      setLoading(true)
      const ads = await api.getAds({
         sort:'desc',
         limit:9,
         q,
         cat,
         state,
      });    
      
      setAdsList(ads.ads);
      setResultOpacity(1)
      setLoading(false)
   }


   useEffect(()=> {
      const queryString:string[] = [];
      if(q){
         queryString.push(`q=${q}`)
      }
      if(cat){
         queryString.push(`cat=${cat}`)
      }
      if(state){
         queryString.push(`state=${state}`)
      }
      
      navigate({
         search:`${queryString.join('&')}`
      })

      if(timer){
         clearTimeout(timer);
      }

      timer = setTimeout(getAdsList, 2000)
      setResultOpacity(0.3)

   },[q, cat, state])


   useEffect(() => {
      const getStates = async () => {
         const sList = await api.getStates();
         setStateList(sList);
      }

      getStates()
   },[api])

   useEffect(() => {
      const getCategories = async () => {
         const categories = await api.getCategories();    
         setCategories(categories);
      }

      getCategories()
   },[api])
      

   return (
      <>
         <Header/>
         <PageContainer>
            <PageArea>
               <div className="left-side">
                  <form>
                     <input 
                        name='q'
                        type="text"  
                        placeholder="Buscar" 
                        value={q ?? ''}
                        onChange={e=>setQ(e.target.value)}
                     />
                     <div className="filter-name">Estado:</div>
                     <select 
                        name='state' 
                        value={state ?? ''}
                        onChange={e=>setState(e.target.value)}
                     >
                        <option value=""></option>
                        {
                           stateList.map((item)=>(
                              <option key={item._id} value={item.name}>{item.name}</option>
                           ))
                        }
                     </select>
                     <div className="filter-name">Categorias:</div>
                     <ul>
                        {
                           categories.map((item)=>(
                              <li 
                                 className="category-item" 
                                 key={item._id}
                                 onClick={()=>setCat(item.slug)}
                              >
                                 <div className={cat==item.slug ? "checkBox-item active" : "checkBox-item"}></div>
                                 <span>{item.name}</span>
                              </li>
                           ))
                        }
                     </ul>
                  </form>
               </div>
               <div className="right-side">
                  <h3>Resultados da pesquisa</h3>
                  
                  {
                     loading &&
                     <div className="loader">
                        <ClipLoader color="#48309C" size={45}/>
                     </div>
                  }
                  {
                     !loading && adsList.length === 0 &&
                     <div className="listWarning">Nenhum resultado encontrado.</div>
                  }

                  <div className="adList" style={{opacity: resultOpacity}}>
                     {
                        adsList.map((item) => (
                           <AdItem key={item.id} data={item} width="25%"/>
                        ))
                     }
                  </div>
               </div>
            </PageArea>
         </PageContainer>
      </>

   )
}