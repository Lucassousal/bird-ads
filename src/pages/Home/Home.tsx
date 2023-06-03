import { CategoryContainer, ListContainer, PageArea, SearchArea } from "./Home.styled"
import { PageContainer } from "../../components/MainComponents"
import { useApi } from "../../Services/Api"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AdItem } from "../../components/partials/AdItem/AdItem"
import Header from "../../components/partials/Header/Header"
import { AdsType } from "../../types/Ads"
import { CategoryType } from "../../types/Category"
import Footer from "../../components/partials/Footer/Footer"

type FormData = {
  q: string;
  state:string;
}

type StateType = {
  _id:string;
  name:string;
}


export const Home = () => {
  const api = useApi()
  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors} } = useForm<FormData>();
  
  const [stateList, setStateList] = useState<StateType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [adsList, setAdsList] = useState<AdsType[]>([])
  
  const onSubmit = handleSubmit( async (data) => {
    navigate(`/ads?q=${data.q}&state=${data.state}`)
  })

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
  
  useEffect(() => {
    const getRecentsAds = async () => {
      const ads = await api.getAds({
        sort:'desc',
        limit:15,
      });    
      
      setAdsList(ads.ads);
    }

    getRecentsAds()
  },[api])

  

  return (
    <>
      <Header/>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <p>{errors.q?.message ? errors.q?.message : errors.state?.message}</p>
            <form action="/ads" method="GET" onSubmit={onSubmit}>
              <input {...register('q')} type="text" placeholder="Buscar" />
              <select {...register('state')} defaultValue={''}>
                <option value=''>Selecione</option>
                {stateList.map((item)=>(
                  <option key={item._id} value={item.name}>{item.name}</option>
                ))}
              </select>
              <button type='submit'>Pesquisar</button>
            </form>
          </div>
          <CategoryContainer>
              {categories.map((item) => (
                <Link key={item._id} to={`/ads?cat=${item.slug}`}>
                  <img src={item.img} alt={item.name} />
                  <span>{item.name}</span>
                </Link>
              ))}
          </CategoryContainer>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          <h2>Anúncios recentes</h2>
          <ListContainer>
            {
              adsList.map((item)=> (
                <AdItem key={item.id} data={item}/>
              ))
            }
          </ListContainer>
          <Link to={'/ads'}>Ver todos</Link>
        </PageArea>
      </PageContainer>
      <Footer/>
    </>

  )
}