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
   display:flex;
   flex-wrap:wrap;
`

