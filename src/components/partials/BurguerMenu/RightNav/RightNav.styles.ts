import styled from "styled-components"

type RighNavProps = {
   open : boolean;
}


export const Ul = styled.ul<RighNavProps>`
   list-style:none;
   display:flex;
   flex-flow:row nowrap;
   position:absolute;
   z-index:10;

   li{
      padding:18px 10px;
   
   }  
   
   @media (max-width: 768px){
      flex-flow: column nowrap;
      background-color:#ccc;
      position:fixed;
      transform: ${({open}) => open ? 'translateX(0)' : "translateX(100%)" };
      top:0;
      right:0;
      height: 100vh;
      width: 60vw;
      max-width:300px;
      padding-top:3.5rem;
      transition: transform 0.3s ease-in-out;
   }
   
      li{
         color:#333;
      }
   
`