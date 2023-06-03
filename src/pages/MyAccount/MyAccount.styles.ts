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

`
