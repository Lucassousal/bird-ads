import { PageContainer } from "../../components/MainComponents"
import { PageArea, BodyPage, OtherAreas, BreadChumb } from "./AdPage.styles"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useLoaderData } from "react-router-dom";
import { Ad } from "../../types/Ad";
import Header from "../../components/partials/Header/Header";
import { AdItem } from "../../components/partials/AdItem/AdItem";
import Footer from "../../components/partials/Footer/Footer";

export const AdPage = () => {

   const ad = useLoaderData() as Ad; 
   console.log("🚀 ~ file: AdPage.tsx:11 ~ AdPage ~ ad:", ad)

   const formatDate = (date:string) => {
      const currentDate = new Date (date)
      const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
      const day = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      return `${day} de ${months[month]} de ${year}`
   }
   

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
                        <div className="ad-description">
                          <p>{ad.description}</p>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit et neque similique explicabo eius facere est! Assumenda, omnis cum corporis aliquam sequi delectus quo consequuntur saepe laudantium, porro, nisi corrupti?
                           Facilis sed, reprehenderit optio fuga, eveniet magni tenetur corporis veritatis hic error cupiditate expedita numquam repellendus reiciendis eius nisi a ad iure, quos voluptatibus? Recusandae soluta mollitia officiis consequatur obcaecati.
                           Ratione qui odit doloribus deserunt minima non pariatur corporis culpa cumque, libero quam! Aperiam, impedit asperiores voluptates dicta aspernatur a iure numquam, commodi minus in cumque modi, corporis molestiae possimus. 
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laudantium temporibus id quam repellat? Nam unde labore quaerat consequatur, animi, ut dolor, sed maiores ab fugiat dolores tempore omnis hic.</p>
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