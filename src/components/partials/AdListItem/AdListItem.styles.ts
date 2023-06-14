import styled from "styled-components";

export const ContainerAd = styled.div`
   display:flex;
   background-color:#eee;
   border-radius:15px;
   padding:20px;
   
   .left-side-AdList{
      .container-image{
         max-width:260px;
         height:130px;

         img{
            height:100%;
            margin-right:20px;
         }
      }
   }

   .right-side-AdList{
      width:100%;

      &-top{
         display:flex;
         justify-content:space-between;
         align-items:center;
     
         .ad-title{
            font-weight:600;
         }

         .status-active{
            padding:5px 8px;
            background-color:green;
            color:#fff;
            border-radius:15px;
            font-size:0.8rem;
         }

         .status-inactive{
            padding:5px 8px;
            background-color:red;
            color:#fff;
            border-radius:15px;
            font-size:0.8rem;
         }
      }

      &-middle{
         font-size:0.8rem;
      
      }

      &-bottom{
         font-size:0.8rem;
         text-align:right;

         a{
            text-decoration:none;
            color:#48309c;
            cursor: pointer;

            &:hover{
               text-decoration:underline;
            }
         }
      }

   }

`

export const ModalContainer = styled.div`
   display:flex;
   flex-direction:column;


   .titulo{
      color: #333;
      text-align:center;
   }

   .close-button{
      width:100%;
      padding:10px 25px;
      border: 2px solid #018A80;
      border-radius: 15px;
      display:flex;
      justify-content:center;
      align-items:center;
      color: #018A80;
      cursor: pointer;
      margin-bottom: 10px;

      &:hover{
         border: 2px solid #018A80;
         transition: all ease 0.1s;
         opacity: 0.8;
      }

      &:disabled{
         opacity: 0.5;
         cursor:not-allowed;
      }
   }


   form {
      
      label{
         display:block;
         margin-bottom:15px;
      }

      .area--title {
         color: #333;
         font-weight: 500;
         width:300px;
      }

      .area--input{
         flex: 1;

         input, select, textarea{
            width:100%;
            margin-top:5px;
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
         }

         input[type=checkbox]{
            margin:0;
            width:fit-content;
         }

         textarea {
            height:100px;
            resize:none;
         }
      }

      .area--negotiable{
         display:flex;   
         align-items:center;   
         margin-bottom:10px;
         gap:10px;
         
         .area--title{
            flex:1;
            justify-self:right;
            text-align:right;
         }

         .area--input{
            display:flex;
            flex:0;
            align-items:center;
         }

         input{
            accent-color:#018A80;
         }

      }

      .button--area{
         margin-top:30px;
      }

      button{
         width:100%;
         padding:10px 25px;
         border: 2px solid #018A80;
         border-radius: 15px;
         background-color: #018A80;
         display:flex;
         justify-content:center;
         align-items:center;
         color: #fff;
         cursor: pointer;
         margin-bottom: 10px;

         &:hover{
         border: 2px solid #018A80;
         transition: all ease 0.1s;
         opacity: 0.8;
         }

         &:disabled{
         opacity: 0.5;
         cursor:not-allowed;
         }
      }

      .area-images{
         display:flex;
         flex-wrap:wrap;
         gap:15px;

         .image-container{
            width:80px;
            height:80px;
            margin-bottom: 20px;
            position:relative;
   
            .remove-image{
               position:absolute;
               color: #fff;
               right:-8px;
               top:-8px;
               width:20px;
               height:20px;
               background-color:red;
               border-radius:10px;
               display:flex;
               justify-content:center;
               align-items:center;
               cursor: pointer;
            }
   
            img{
               width:inherit;
            }
         }
      }
   }


`

export const NoImages = styled.p`
   margin:10px 0 25px 0;
   font-size:0.9rem;

`