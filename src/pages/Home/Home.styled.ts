import styled from "styled-components";



export const SearchArea = styled.div`
   background-color:#48309C;
   padding:20px 0;

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
      }

      input {
         flex:1;
         padding:11px 5px;
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
`

export const PageArea = styled.div`

`


export const CategoryContainer = styled.div`
   display:flex;
   justify-content:space-around;
   align-items:center;
   padding-top:20px;

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