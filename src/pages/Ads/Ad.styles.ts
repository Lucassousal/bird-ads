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
         justify-content:flex-start;
         padding:5px;
         color:#333;
         font-size:0.8rem;
         gap:5px;
         cursor:pointer;

         input[type='radio']{
            width:fit-content;
            accent-color:#018a80;
         }

         &:hover{
            background-color:#ddd;
         }
      }

      .button-container{
       text-align:center;
       margin:10px;
  
       button{
         font-size:0.8rem;
         font-weight:500;
         background-color:#fff;;
         border:2px solid #48309C;
         border-radius:5px;
         padding:5px 8px;
         cursor:pointer;

         &:hover{
            background-color:#48309C;
            color:#fff;
            transition: all ease 0.2s;
         }
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

      .pagination{
         display:flex;
         align-items:center;
         justify-content:center;
         margin:10px 0;
         gap:5px;

         .pagItem{
            padding: 5px 8px;
            border:1px solid #ccc;
            border-radius: 8px;
            font-size:0.8rem;
            cursor: pointer;

            &:hover{
               background-color:rgb(72, 48, 156,0.3);
            }

            &.active{
               background-color:rgb(72, 48, 156,0.3);
               color:#fff;
            }
         }
      }
      
   }
`