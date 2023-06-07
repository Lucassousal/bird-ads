import { useState } from "react"
import { StyledBurguer } from "./BurguerMenu.styles"
import { RightNav } from "./RightNav/RightNav"

type Props = {
  logged: boolean;
  click:() => void;
}

export const BurguerMenu = ({logged, click}:Props ) => {

  const [open, setOpen] = useState(false)

  return(
    <>
      <StyledBurguer open={open} onClick={()=> setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </StyledBurguer>
      <RightNav click={click} logged={logged} open={open}/>
    </>
  )
}