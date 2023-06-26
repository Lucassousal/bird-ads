import { PageContainer } from "../../components/MainComponents"
import { PageArea, BodyPage, OtherAreas, BreadChumb } from "./AdPage.styles"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useLoaderData } from "react-router-dom";
import { Ad } from "../../types/Ad";
import Header from "../../components/partials/Header/Header";
import { AdItem } from "../../components/partials/AdItem/AdItem";
import Footer from "../../components/partials/Footer/Footer";
import { formatDate } from "../../helpers/formateDate";

const BASE_URL = import.meta.env.VITE_REACT_API_URL

export const AdPage = () => {

   const ad = useLoaderData() as Ad; 
   
   console.log(ad)

   return(
      <>
         <Header/>
         <BodyPage>
            <PageContainer>
               <BreadChumb>
                  <Link to='/'>Home</Link>
                  <span className="separator">&#8250;</span>
                  <Link to={`/ads?state=${ad.stateName}`}>{ad.stateName}</Link>
                  <span className="separator">&#8250;</span>
                  <Link to={`/ads?state=${ad.stateName}&cat=${ad.category.slug}`}>{ad.category.name}</Link>
                  <span className="separator">&#8250;</span>
                  {ad.title}
               </BreadChumb>
               <PageArea>
                  <div className="leftSide">
                     <div className="title">
                        <h3>{ad.title}</h3>
                     </div>
                     <div className="ad-created">
                        <p>Criado em: {formatDate(ad.dateCreated)}  -  {ad.views} pessoas viram esse anúncio</p>
                     </div>
                     <div className="box">
                     {
                        ad.images.length > 0 ?

                           <Carousel className="carousel" 
                              autoPlay={false}
                              thumbWidth={60}
                              showStatus={false}
                           >
                              {
                                 ad.images.map((item, index) => (
                                    <div key={index}>
                                       <img  src={item} alt="" />
                                    </div>
                                 ))
                              }
                           </Carousel>

                        :

                        <div className="image-container">
                           <img src={`${BASE_URL}/media/default.jpg`} alt="" />
                        </div>

                     }
                     <div className="ad-description">
                        <p>{ad.description}</p>
                     </div>
                     </div>
                  </div>
                  <div className="rightSide">
                     <div className="sell--info">
                        <span className="seller-name">{ad.userInfo.name}</span>
                        <span className="seller-email">Email: {ad.userInfo.email}</span>
                        <span className="seller-state">Estado: {ad.stateName}</span>
                        <a href={`mailto:${ad.userInfo.email}`} className="seller-contact">
                           <span>Fale com vendedor</span>
                        </a>
                        <div>
                           <div className="price">
                              {`R$ ${ad.price}`.replace('.',',')}
                              {
                                ad.priceNegotiable &&
                                 <span className="negotiable">Negociável</span>
                              }
                           </div>
                        </div>
                     </div>
                  </div>
               </PageArea>
               {
                  ad.others ?
                     ad.others.length > 0 ?
                        <OtherAreas>
                           <div className="other-title">
                              <h3>Outras ofertas do vendedor</h3>
                           </div>
                           <div className="other-ads">
                              {
                                 ad.others?.map((item, index) => (
                                    <AdItem width={'25%'} key={index} data={item}/>
                                 ))
                              }
                           </div>
                        </OtherAreas>
                     :
                     <></>
                  :
                  <></>
               }
            </PageContainer>
         </BodyPage>
         <Footer/>
      </>

   )
}