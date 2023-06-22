import { CategoryContainer, ListContainer, PageArea, SearchArea, BannerArea, AuxiliaryBannersContainer } from "./Home.styled"
import { PageContainer } from "../../components/MainComponents"
import { useApi } from "../../Services/Api"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AdItem } from "../../components/partials/AdItem/AdItem"
import Header from "../../components/partials/Header/Header"
import { AdsType } from "../../types/Ads"
import Footer from "../../components/partials/Footer/Footer"
import Banner from '../../assets/banner.jpeg'
import SecondBanner from '../../assets/second-banner.jpg'
import ThirdBanner from '../../assets/third-banner.jpg'
import { GeneralContext } from "../../context/Context"

type FormData = {
  q: string;
  state:string;
}


export const Home = () => {
  
  const api = useApi()
  const {categories, stateList} = GeneralContext()
  const navigate = useNavigate()
  const {register, handleSubmit } = useForm<FormData>();
  
  const [adsList, setAdsList] = useState<AdsType[]>([])
  
  const onSubmit = handleSubmit( async (data) => {
    navigate(`/ads?q=${data.q}&state=${data.state}`)
  })
  
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
            <form action="/ads" method="GET" onSubmit={onSubmit}>
              <input {...register('q')} type="text" placeholder="Buscar" />
              <select {...register('state')} defaultValue={''}>
                <option value=''>Selecione</option>
                {
                  stateList &&
                  stateList.map((item)=>(
                    <option key={item._id} value={item.name}>{item.name}</option>
                  ))
                }
              </select>
              <button type='submit'>Pesquisar</button>
            </form>
          </div>
          <CategoryContainer>
              {
                categories &&
                categories.map((item) => (
                <Link key={item._id} to={`/ads?cat=${item.slug}`}>
                  <img src={item.img} alt={item.name} />
                  <span>{item.name}</span>
                </Link>
              ))}
          </CategoryContainer>
        </PageContainer>
      </SearchArea>
      <BannerArea data={Banner}>
        <div className="banner-content"></div>
      </BannerArea>
      <PageContainer>
        <PageArea>
          <h2>Anúncios recentes</h2>
          <ListContainer>
            {
              adsList.map((item)=> (
                <AdItem key={item.id} data={item} width="18%"/>
              ))
            }
          </ListContainer>
          <Link className="seeAll" to={'/ads'}>Ver todos</Link>
          <AuxiliaryBannersContainer second={SecondBanner} third={ThirdBanner}>
            <h2>Mostre seu anúncio na Bird!</h2>
            <div className="container-aux-banners">
              <Link to={'/signup'}>
                <div className="auxiliary-banners second"></div>
              </Link>
              <Link to={'/post-an-ad'}>
                <div className="auxiliary-banners third"></div>
              </Link>
            </div>
          </AuxiliaryBannersContainer>
        </PageArea>
      </PageContainer>
      <Footer/>
    </>

  )
}