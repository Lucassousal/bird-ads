import styled from "styled-components";

export const Item = styled.div`

   width:20%; 

   a{
      display:block;
      text-decoration:none;
      color:#333;
      padding:10px;
      border-radius:10px;

      &:hover{
         background-color:#eee;
         text-decoration:none;
         transition: all ease 0.2s;
      }
   }

   .image {
      position:relative;
      width:156px;
      height:156px;
      background-color:#ccc;
      border-radius:10px;


      img{
         width:100%;
         object-fit:contain;
         border-radius:10px
      }

      .negotiable{
         display:inline-block;
         position:absolute;
         top:-6px;
         right:-8px;
         color:#fff;
         background-color:#018A80;
         padding:3px 8px;
         border-radius:5px;
         box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.56);
         z-index:999;

      }
   }

   .itemPrice, .itemName {
      margin-top:10px;
      font-size:1rem;
      font-weight:400;
      overflow:hidden;
      word-break:break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
   }
   .itemName span {
      display:block;
      text-overflow:ellipsis;
      max-height:37px;
   }

   .itemPrice{
      font-weight:600;
   }
`