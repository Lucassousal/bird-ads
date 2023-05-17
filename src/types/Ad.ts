import { AdsType } from "./Ads"

export interface Ad {
   category:{
      name:string,
      slug:string,
      _id:string
   },
   dateCreated:string,
   description:string,
   id:string,
   images:string[],
   others:AdsType[] | null,
   price:number,
   priceNegotiable:boolean,
   stateName:string,
   title:string,
   userInfo:{
      email:string,
      name:string
   },
   views:number
}