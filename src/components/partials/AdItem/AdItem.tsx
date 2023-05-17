import { Item } from "./AdItem.styles"
import { AdsType } from "../../../types/Ads"
import { Link } from "react-router-dom"

type Props = {
   data: AdsType
   width?:string
}

export const AdItem = ({data, width}:Props) => {
   return(
      <Item width={width}>
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