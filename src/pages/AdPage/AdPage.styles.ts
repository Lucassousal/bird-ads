import styled from "styled-components";
import email from "../../assets/icons/e-mail.png"


export const BodyPage = styled.div`
   width:100%;
   height:100%;
   background-color:#fff;
   padding:0 20px;
`

export const PageArea = styled.div`
   display:flex;
   padding:20px 0;
   gap:20px;

   .leftSide{

      max-width:840px;

      .title{
         font-size:1.5rem;
         color: #333;
         margin:0;
      
         h3{
            margin: 0;
            font-weight:500;
            text-transform:uppercase;
         }
      }

      .ad-created {
         font-size:0.8rem;
      }

      .box{
         display:flex;
         gap:20px;
         background-color:#eee;
         padding:20px 20px 0 20px ;
         border-radius:20px;
         .carousel{
            min-width:400px;
         }

         .ad-description p{
            font-size:0.9rem;
            text-align:justify;
         }

         .image-container{
            width:400px;
            margin-bottom:20px;

            img{
               width:inherit;
            }
         }
      }

   }

   .rightSide{
      margin-top: 73px;

      .sell--info{
         padding: 30px 40px;
         background-color: #eee;
         border-radius:15px;
         display:flex;
         flex-direction:column;
         align-items:center;
         position:sticky;
         top:10px;
         z-index:999;

         .seller-name{
            text-transform:uppercase;
            font-size:1.2rem;
            font-weight:500;
         }

         .seller-email, .seller-state {
            align-self:flex-start;
            font-size: 0.8rem;
            color:#666;
         }

         .seller-contact{
            text-decoration: none;
            color: #fff;
            margin:30px auto;
            display:flex;
            align-items:center;
            gap:5px;
            background-color:#018a80;
            padding:10px 20px;
            border-radius:10px;
            font-size:1rem;

            &:hover{
                  text-decoration:underline;
               }

            
            &::before{
               content:'';
               display:inline-block;
               width:24px;
               height:20px;
               background-image:url(${email});
               background-position:center;
               background-repeat:no-repeat;
               background-size: cover;
               filter:invert();
            }
         }

         .price{
            position:relative;
            font-size:1.5rem;
            font-weight:500;
            color:#fff;
            background-color: #48309C;
            padding:15px 60px;
            text-align:center;
            border-radius:20px;

            .negotiable{
               display:inline-block;
               position:absolute;
               top:-10px;
               right:-10px;
               color:#fff;
               background-color:#018A80;
               padding:3px 8px;
               border-radius:5px;
               box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.56);
               z-index:999;
               font-size:0.8rem;

            }

         }

       
      }
   }
  
   @media (max-width:1180px){
      .rightSide{

         .sell--info{

            .seller-contact > span{
               font-size:0.8rem;;
            }
            .price{
               font-size:1.2rem;;
            }
         }
      }
   }

   @media (max-width:1120px){
      .rightSide{

         .sell--info{

            .seller-contact > span{
               font-size:0.8rem;
            }
            .price{
               font-size:1.0rem;
               padding:15px 42px;
            }
         }
      }
   }
   
   @media (max-width:1000px){
      .box{
         flex-direction: column;
         gap:0 !important;
      }
   }


   @media (max-width: 699px){
      flex-direction: column;
      .rightSide{
         margin:0;

         .sell--info{

            .price{
               font-size:1.2rem;
               padding:15px 60px;
            }
         
         }

      }
   }

   @media (max-width: 480px){
      .leftSide .box .carousel {
         min-width: 200px;
      }
   }

`

export const OtherAreas = styled.div`
   
   background-color:#eee;
   padding:20px;
   border-radius:15px;

   .other-title{
      color:#333;
   }

   .other-ads{
      display:flex;
      
   }
`

export const BreadChumb = styled.div`
   font-size:0.9rem;
   color:#333;
   padding-top: 10px;

   a{
      text-decoration:none;
      color:#333;

      &:hover{
         color: #48309C;
         text-decoration:underline;
      }
   }

   .separator{
      margin: 0 10px;
      font-size:1.1rem;
   }
`