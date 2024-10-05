import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { useAuth } from "./AuthProvider";
import { Transaction } from "../types/types";



type CategoryContextType = {
    
    categories: [] | null;
    setCategories: Dispatch<SetStateAction<Transaction | null>>

    getCategoryForUser: () => 


    // createNewCategory: () => Promise<Transaction | undefined >
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);


export const CategoriesProvider = ({children}: ReactNode) => {
    
    const {authToken} = useAuth();
    
    const [categories, setCategories] = useState([]);

    const getCategoryForUser = async() => {
        try{
            const response = await fetch("http://127.0.0.1:8000/users/api/register/", {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authToken?.access)
                }
            });
            if(!response.ok){
                throw new Error(`HTTP Error!: ${response.status}`)
            }

            const data = await response.json();
            console.log('data in Category Provider')
            return data;
        } catch(e) {
            console.log(e)
            return null;
        }
    }

    const createNewCategory = async() => {

        try{
            const response = await fetch("http://127.0.0.1:8000/budget_categories/api/create/", {
                method: 'CREATE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authToken?.access)
                }
            });
            if(!response.ok) {
                throw new Error(`HTTP Error!: ${response.status}`)
            }
        }catch(e) {
            console.log(e, 'Error in createNewCategory')
        }
    }

    const fixCategory = () => {

    }

    return(
        <CategoryContext.Provider
            value={{

            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => {
    const context = useContext()
}