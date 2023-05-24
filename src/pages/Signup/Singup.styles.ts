import styled from "styled-components";
import Xbutton from '../../assets/botao-x.png'

export const PageArea =styled.div`
  max-width:450px;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin:20px auto;
  background-color:#fff;
  padding:30px 50px;
  box-shadow:0px 0px 3px #999;
  border-radius:5px;


  .container--description{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }

  form {
    
    label{
      display:block;
      margin-bottom:20px;
    }

    .area--title {
      color: #333;
      font-weight: 500;
      width:300px;
    }

    .area--input{
      flex: 1;

      input, select{
        width:100%;
        margin-top:5px;
        padding:10px 5px;
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

  hr {
      margin: 30px auto;
      width:100%;
      border: 1px solid #ccc;
      border-top:0;
    }

    p{
      text-align:center;
      margin:0;
      a{
        text-decoration:none;
        color: #018A80;

        &:hover{
          text-decoration:underline;
        }
      }
    }

    .home-link{
      margin-top:15px;
      font-size:0.8rem;
    }
`

export const ErrorMessage = styled.div`
  width:100%;
  display:flex;
  align-items:baseline;
  padding:5px 10px;
  color:red;
  font-size:0.8rem;

  &::before{
    content:'';
    background:url(${Xbutton})
      no-repeat center center/cover;
    display:block;
    position:relative;
    margin-right:5px;
    width:15px;
    height:15px;
    top:3px;
  }
`