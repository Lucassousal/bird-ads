import React, {createContext, useState, useEffect, useContext,} from 'react'
import { CategoryType } from '../types/Category'
import { useApi } from '../Services/Api'
import { StateListType } from '../types/State'


type ContextType = {
 categories: CategoryType[];
 setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>
 stateList: StateListType[]
 setStateList: React.Dispatch<React.SetStateAction<StateListType[]>>
}

export const Context = createContext<Partial<ContextType>>({})

export const ContextProvider = ({children}:React.PropsWithChildren) => {
  
  const api = useApi();
  
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [stateList, setStateList] = useState<StateListType[]>([])

  useEffect(()=> {
    const getCategories = async () => {
       const categories = await api.getCategories()
       setCategories(categories)
    }
    getCategories();
  },[api])

  useEffect(() => {
    const getStates = async () => {
       const sList = await api.getStates();
       setStateList(sList);
    }

    getStates()
 },[api])


  return (
    <Context.Provider value={
      {
        categories, 
        setCategories,
        stateList,
        setStateList
      }
    }>
        {children}
    </Context.Provider>
  )
}

export const GeneralContext = () => useContext(Context)