import { Item } from "./AdItem.styles"
import { AdType } from "../../../pages/Home/Home"
import { Link } from "react-router-dom"

type Props = {
   data: AdType
}

export const AdItem = ({data}:Props) => {
   return(
      <Item>
         <Link to={`/ad/${data.id}`}>
            <div className="image">
               <img src={data.image} alt={data.title} />
               {
                  data.priceNegotiable &&
                  <div className="negotiable">Negociável</div>
               }
            </div>
            <div>
               <div className="itemName">
                  <span>{data.title} </span>
               </div>
               <div className="itemPrice">
                  <span>{`R$ ${data.price}`}</span>
               </div>
            </div>
         </Link>
      </Item>
   )
}