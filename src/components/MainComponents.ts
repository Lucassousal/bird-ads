import styled from 'styled-components'
import Xbutton from '../assets/botao-x.png'

export const Template = styled.div`

`

export const PageContainer = styled.div`
  max-width:1024px;
  margin:auto;
`

export const PageTitle = styled.h1`
  color:#333;
  font-size:1.5rem;
`
export const PageBody = styled.div`

`

export const GeralErrorMessage = styled.div`
  margin: 10px;
  background-color:#FFCACA;
  color: #000;
  border: 2px solid #FF0000;
  border-radius:5px;
  padding:5px;
  width:100%;
  display:flex;
  align-items:center;

  &::before{
    content:'';
    background:url(${Xbutton})
      no-repeat center center/cover;
    display:block;
    position:relative;
    margin-right:5px;
    width:15px;
    height:15px;
  }
`
