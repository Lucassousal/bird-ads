
export type User = {
   name:string;
   email:string;
   state:string;
   ads:{
         _doc:{
            _id:string;
            images:{
               url:string,
               default:boolean
            }[],
            dateCreated:string,
            title:string,
            category:string,
            price:number,
            priceNegotiable:boolean,
            description:string,
            views:number,
            state:string,
            status:string;
         }   
      
      }[]
   
}