import styled from "styled-components";

export const MyAccountPageArea = styled.div`
   display:flex;
   min-height: calc(100vh - 69px - 80px);
   
   .left-side{
      max-width:300px;
      padding:20px;

      .user-data-container{
         padding:20px;
         background-color:#48309c;
         color:#fff;
         display:flex;
         flex-direction:column;
         gap:10px;
         border-radius:15px;

         .separator{
            width:100%;
            height:1px;
            border-top:1px solid #fff;
            margin-bottom:10px;
            margin-top:-5px;
         }

         .user-data-info{
            font-size:0.8rem;
         }

         .user-data-link{
            text-decoration:none;
            color:#fff;
            align-self: flex-end;
            margin-top:15px;

            &:hover{
               text-decoration:underline;
               cursor: pointer;
            }

         }  
      }

   }
   .right-side{
      flex :1;

      .ads-box-container{
         margin:10px;
         padding:20px;
         background-color:#fff;
         border-radius:15px;
      }

      .ads-list {
         display:flex;
         flex-direction:column;
         gap:10px;
      }
   }
`

export const UserModalContainer = styled.div`

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
   }

`
