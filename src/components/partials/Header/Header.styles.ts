import styled from 'styled-components';

export const HeaderArea = styled.div`
  background-color:#fff;
  height:70px;
  border-bottom:1px solid #ccc;
  padding:0 20px;

  a {
    text-decoration:none;
    color:#333;
  }

  .container {
    max-width:1200px;
    height:100%;
    margin:auto;
    display:flex;
  }

  .logo {
    flex:1;
    display:flex;
    align-items:center;

    a{
      display:flex;
      align-items:center;
      gap:5px
    }

    .logo-name{
      color:#333;
      font-size:1.2rem;
      margin-top:10px;
    }
  }

  .defaultNav{
      padding: 10px 0;
      display:flex;
      align-items:center;

      .defaultUl {
        list-style: none;
        margin: 0;
        padding:0;
      }

      .defaultUl {
        display:flex;
        align-items:center;
        height: 40px;
        gap:20px;
      }

      a{
        font-size:0.9rem;
      }

    }


`

type ActionButtonProps = {
  $primary?:boolean
}


export const ActionButton = styled.div<ActionButtonProps>`
  padding:10px 25px;
  border: 2px solid ${props => props.$primary ? '#ccc' : '#018A80'};
  border-radius: 15px;
  background-color: ${props => props.$primary ? 'transparent' : '#018A80'};
  display:flex;
  justify-content:center;
  align-items:center;
  color: ${props => props.$primary ? '#333' : '#fff'};
  cursor:pointer;

  &:hover{
    border: 2px solid #018A80;
    transition: all ease 0.1s;
    opacity: ${ props => props.$primary ? '1' : '0.8'}
  }
`

export const AddButton = styled(ActionButton)`
  border: 2px solid #48309C;
  background-color: #48309C;
  color:#fff;

  &:hover{
    border: 2px solid #48309C;
    transition: all ease 0.1s;
    opacity: 0.8;
  }

`