import styled from "styled-components";



export const SearchArea = styled.div`
   background-color:#48309C;
   padding:20px;

   .searchBox {

   }

   form{
      display:flex;
      justify-content:center;
      align-items:center;
      gap:5px;

      input, select{
         padding:10px 5px;
         border: 1px solid #ccc;
         border-radius:5px;
         
         &:hover{
            border: 1px solid #333;
         }

         &:focus{
            transition:all ease 0.4s;
            outline-color: #018a80;
         }

         &::placeholder{
            font-size:1.2rem;
         }
      }

      input {
         flex:1;
         padding:11px 5px;
         padding-left:20px;
      }
     
      button {
         padding:10px 25px;
         border: 2px solid #ccc;
         border-radius: 15px;
         background-color:#fff;
         display:flex;
         justify-content:center;
         align-items:center;
         color: #333;
         cursor:pointer;

         &:hover{
            border: 2px solid #018A80;
            transition: all ease 0.1s;
         }
      }
   }

   @media (max-width:462px){
      form{
         flex-direction:column;
         gap:15px;

         input, select{
            width:100%;
         }
      }
   }

`

export const CategoryContainer = styled.div`
   display:flex;
   justify-content:space-around;
   align-items:center;
   padding-top:20px;
   gap:40px;
   flex-wrap:wrap;
   margin-top:10px;

   a{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:5px;
      text-decoration:none;
      color:#fff;

      &:hover{
         color:#018A80;
      }
   }

`

export const PageArea = styled.div`
   
   display:flex;
   flex-direction:column;
   background-color:#fff;
   padding:0 20px;
   
   h2{
      color:#333;
      font-size:1.2rem;
   }

   .seeAll{
      text-decoration:none;
      color: #018A80;
      font-size:0.8rem;
      font-weight:500;
      align-self:flex-end;
      margin:10px;

      &:hover{
         text-decoration:underline;
      }
   }
`


export const ListContainer = styled.div`
   display:grid;
   grid-template-columns:repeat(5, 1fr);
   gap:20px;
   justify-items:center;

   @media (max-width: 978px){
      grid-template-columns:repeat(4, 1fr);
   }
   @media (max-width: 790px){
      grid-template-columns:repeat(3, 1fr);
   }
   @media (max-width: 586px){
      grid-template-columns:repeat(2, 1fr);
   }
   @media (max-width: 398px){
      grid-template-columns: 1fr;
   }
`


type Props ={
   data: string
}

export const BannerArea = styled.div<Props>`
   background-color: #FFDE51;
   background: linear-gradient(90deg, rgba(255,225,53,1) 10%, rgba(223,177,89,1) 90%);
   height:400px;

   .banner-content{
      background-image: url(${({data}) => data ? data : '' });
      background-size:cover;
      background-repeat:no-repeat;
      background-position:center;
      max-width:1200px;
      height:400px;
      margin: auto;


   }

   @media (max-width:960px){
         height:300px;
         
         .banner-content{
            height:300px;
         }
   
      }

   @media (max-width:736px){
         height:200px;

         .banner-content{
            height:200px;
         }
   
      }
   @media (max-width:492px){
         height:150px;

         .banner-content{
            height:150px;
         }
   
      }
`

type PropsAuxiliaryBannerType = {
   second:string;
   third:string
}

export const AuxiliaryBannersContainer = styled.div<PropsAuxiliaryBannerType>`
   display:flex;
   flex-direction:column;
   align-items:center;
   padding: 40px 0 80px 0;
   margin:10px -20px;
   background-color: #eee;

   h2{
      font-size:3rem;
      color:#333;
      margin-bottom:80px;
   }

   .container-aux-banners{
      display:flex;
      justify-content:space-around;
      align-items:center;
      width:100%;

      a{
         display:inline-flex;
         filter:drop-shadow(0px 0px 0.75rem rgba(0,0,0,0.28));

         &:hover{
            transition: all ease 0.4s;
            scale: 1.05;
         }


         .auxiliary-banners{
            border-radius:15px;
            background-color:transparent;
   
            &.second{
               height:400px;
               width:350px;
               background-image:url(${({second}) => second ? second : '' });
               background-size:cover;
               background-repeat:no-repeat;
               background-position:center;
            }
            &.third{
               height:400px;
               width:350px;
               background-image:url(${({third}) => third ? third : '' });
               background-size:cover;
               background-repeat:no-repeat;
               background-position:center;
            }
         }
   
      }
   }

   @media (max-width: 748px){
      .container-aux-banners{
         flex-direction:column;
         gap:40px;
      }
   }
   @media (max-width: 656px){
      h2{
         font-size:2.5rem;
         text-align:center;
      }
   }
   @media (max-width: 370px){
      .container-aux-banners > a > .auxiliary-banners.second, .container-aux-banners > a > .auxiliary-banners.third{
         height:350px;
         width:300px;
      }
   }
`