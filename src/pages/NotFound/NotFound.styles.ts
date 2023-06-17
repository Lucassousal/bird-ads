import styled from "styled-components";


export const PageArea = styled.div`
   display:flex;
   flex-direction:column;
   justify-content:center;
   align-items:center;
   height:100vh;

   .image{
      max-width:10%;
   }
`

export const PageTitle = styled.h1`
   font-size:10rem;
   color: #48309c;
   margin:0 auto;
  
`

export const PageContent = styled.div`


   .page-subtitle{
      text-transform:uppercase;
      text-align:center;
   }
   .page-info{
      max-width:500px;
      text-align:center;
   }
   .notFound-goHome-button{

   }
`
 
 export const ActionButton = styled.div`
   padding:8px 20px;
   border: 2px solid #48309c;
   border-radius: 15px;
   background-color: #48309c;
   display:flex;
   justify-content:center;
   align-items:center;
   color: #fff;
   cursor:pointer;
   max-width:150px;
   margin: 0 auto;
 
   &:hover{
     border: 2px solid #48309c;
     transition: all ease 0.1s;
     opacity:0.8;
   }
 `