import styled from "styled-components";

export const PageArea = styled.div`
   display:flex;
   margin-top:20px;

   .left-side{
      width:250px;
      margin-right:10px;


      .filter-name{
         font-size:0.9rem;
         font-weight:500;
         margin:10px auto;
         color:#333;
      }

      input, select{
         width:100%;
         padding:5px 5px;
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
            font-size:1rem;
         }
      }

      ul,li{
         margin:0;
         padding:0;
         list-style:none;
      }

      .category-item{
         display:flex;
         align-items:center;
         padding:5px;
         color:#333;
         font-size:0.8rem;
         gap:5px;
         cursor:pointer;

         &:hover{
            background-color:#ddd;
         }

         .checkBox-item{
            display:inline-block;
            width:12px;
            height:12px;
            border:1px solid #333;
            border-radius:2px;
            cursor:pointer;
         }

         .active{
            background-color:#018a80;
            border:1px solid #666;
         }
      }

   }

   .right-side{
      flex:1%;
      padding:0 20px;
      border-left: 1px solid #ddd;
      background-color:#fff;
      
      .listWarning, .loader{
         padding:30px;
         text-align:center;
      }

      .adList{
         display:flex;
         flex-wrap:wrap;
      }
   }
`