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
import Footer from "../../components/partials/Footer/Footer";
import Collapse from "rc-collapse";
import 'rc-collapse/assets/index.css';

 type StateType = {
   _id:string;
   name:string;
 }

 let timer;

export const Ads = () => {

   const api = useApi()
   const navigate = useNavigate()
   const Panel = Collapse.Panel

   const useQueryString = () => {
      return new URLSearchParams(useLocation().search)
   }
   const query = useQueryString();

   const [adsTotal, setAdsTotal] = useState(0);
   const [stateList, setStateList] = useState<StateType[]>([])
   const [categories, setCategories] = useState<CategoryType[]>([])
   const [adsList, setAdsList] = useState<AdsType[]>([])
   const [pageCount, setPageCount] = useState(0)
   const [currentPage, setCurrentPage] = useState(1)

   const [q, setQ] = useState(query.get('q') !== null ? query.get('q') : '')
   const [cat, setCat] = useState(query.get('cat') !== null ? query.get('cat') : '')
   const [state, setState] = useState(query.get('state') !== null ? query.get('state') : '')

   const [resultOpacity, setResultOpacity] = useState(0.3)
   const [loading, setLoading] = useState(true)


   const pagination:number[] = []
   for(let i = 1; i<=pageCount; i++){
      pagination.push(i)
   }

   const getAdsList = async () => {
      setLoading(true)

      const offset = (currentPage -1 ) * 4

      const ads = await api.getAds({
         sort:'desc',
         limit:4,
         q,
         cat,
         state,
         offset,
      });    
      
      setAdsList(ads.ads);
      setAdsTotal(ads.total)
      setResultOpacity(1)
      setLoading(false)
   }

   const cleanFilter = () =>{
      setQ('')
      setCat('')
      setState('')
   }

   useEffect(()=>{
      if(adsList.length > 0){
         setPageCount(Math.ceil(adsTotal / adsList.length))
      }else{
         setPageCount(0)
      }
   },[adsTotal])

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
      setCurrentPage(1)

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
      

   useEffect(()=>{
      setResultOpacity(0.3)
      getAdsList()
   },[currentPage])

   return (
      <>
         <Header/>
         <PageContainer>
            <PageArea>
               <div className="left-side">
                  <Collapse accordion={true}>
                     <Panel header={'Filtre sua busca'}>
                        <form>
                           <input 
                              name='q'
                              type="text"  
                              placeholder="Buscar" 
                              value={q ?? ''}
                              onChange={e=>setQ(e.target.value)}
                           />
                           <p className="filter-name">Estado:</p>
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
                           <p className="filter-name">Categorias:</p>
                           <ul>
                              {
                                 categories.map((item)=>(
                                    <li 
                                       className="category-item" 
                                       key={item._id}
                                    >
                                       <input 
                                          name="cat" 
                                          type="radio" 
                                          id={item._id} 
                                          value={item.slug} 
                                          checked={cat === item.slug}
                                          onChange={(e)=> setCat(e.target.value)} 
                                       />
                                       <label htmlFor={item._id}>{item.name}</label>
                                    </li>
                                 ))
                              }
                           </ul>
                        </form>
                        <div className="button-container">
                           <button onClick={cleanFilter}>Limpar filtros</button>
                        </div>
                     </Panel>
                  </Collapse>
               </div>
               <div className="right-side">
                  <h3>Resultados da pesquisa</h3>
                  
                  {
                     loading && adsList.length === 0 &&
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
                           <AdItem key={item.id} data={item} width="20%"/>
                        ))
                     }
                  </div>
                  <div className="pagination">
                     {
                        pagination.map((item, index)=>(
                           <div onClick={() => setCurrentPage(item)} key={index} className={item === currentPage ? "pagItem active" : "pagItem" }>{item}</div>
                        ))
                     }
                  </div>
               </div>
            </PageArea>
         </PageContainer>
         <Footer/>
      </>

   )
}