import { Link } from "react-router-dom";
import { PageContainer } from "../../components/MainComponents";
import { PageArea, PageTitle, PageContent, ActionButton } from "./NotFound.styles";
import notFound from '../../assets/404-error.png'

type Props ={
  errorPage?:boolean
}

export const NotFound = ({errorPage}:Props) => {
  return (
    <PageContainer>
      <PageArea>
        <img src={notFound} alt="" className="image" />
        <PageTitle>Oops!</PageTitle>
        <PageContent>
          {
            errorPage ?
              <>
                <h2 className="page-subtitle">Ocorreu um erro inesperado</h2>
                <p className="page-info">
                  Desculpe, ocorreu um erro inesperado. Aguarde alguns instantes e tente novamente.
                </p>
              </>
            :
              <>
                <h2 className="page-subtitle">404 - Página não encontrada</h2>
                <p className="page-info">
                  Essa página que você está procurando pode ter sido removida, ou ter
                  mudado o nome, ou está temporariamnete indisponível
                </p>
              </>
          }
          <Link  to="/">
            <ActionButton>Ir para Home</ActionButton>
          </Link>
        </PageContent>
      </PageArea>
    </PageContainer>
  );
};
