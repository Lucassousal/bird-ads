import styled from "styled-components";

type StyledBurguerProps = {
   open:boolean
}


export const StyledBurguer = styled.div<StyledBurguerProps>`
   width:2rem;
   height:2rem;
   position: ${({open}) => open ? 'fixed' : 'absolute'};
   top:15px;
   right:25px; 
   z-index: 30;
   display: none;

   @media (max-width: 768px){
      display:flex;
      justify-content:space-around;
      flex-flow:column nowrap;
   }

   div{
      width:2rem;
      height:0.25rem;
      background-color: #333;
      display:flex;
      justify-content:space-around;
      flex-flow: column nowrap;
      border-radius:10px;
      transform-origin: 1px;
      transition: all 0.3s linear;

      &:nth-child(1){
         transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)' }
      }
      &:nth-child(2){
         transform: ${({open}) => open ? 'translateX(100%)' : 'translateX(0)' };
         opacity: ${({open}) => open ? 0 : 1}
      }
      &:nth-child(3){
         transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)' }
      }
   }
`;


