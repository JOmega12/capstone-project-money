import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthProvider";
import { Budget_categories } from "../types/types";



type CategoryContextType = {
    
    categories: Budget_categories | null;
    setCategories: Dispatch<SetStateAction<Budget_categories | null>>;


    createNewCategory: ({name, userId, is_custom}: Pick<Budget_categories, "name" | "userId" | "is_custom" >) => Promise<Budget_categories | undefined>;
}


type CategoryProviderProps = {
    children: ReactNode;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);


export const CategoriesProvider = ({children}: CategoryProviderProps) => {
    
    const {authToken} = useAuth();
    
    const [categories, setCategories] = useState<Budget_categories | null>(null);

    const getCategoryForUser = async() => {
        try{
            const response = await fetch("http://localhost:8000/budget_categories/api/", {
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

    const refetch = async() => {
        const data = await getCategoryForUser();
        if(data) {
            setCategories(data)
        }
    }

    useEffect(() => {
        refetch()
    }, [])


    const createNewCategory = async({name, userId, is_custom}: Pick<Budget_categories, "name" | "userId" | "is_custom" >): Promise<Budget_categories | undefined> => {

        try{
            const response = await fetch("http://127.0.0.1:8000/budget_categories/api/create/", {
                method: 'CREATE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authToken?.access)
                },
                body: JSON.stringify({name, userId, is_custom})
            });
            if(!response.ok) {
                throw new Error(`HTTP Error!: ${response.status}`)
            }

            const data = await response.json();
            // await refetch();
            return data
        }catch(e) {
            console.log(e, 'Error in createNewCategory')
        }


    }

    // const fixCategory = async(id: number) => {

    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/budget_categories/api/update/', {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + String(authToken?.access)
    //             },
    //             body: JSON.stringify({});
    //         });
    //         console.log(response, 'response in fix Categories')

    //         if(!response.ok){
    //             throw new Error(`HTTP error: ${response.status}`)
    //         }

    //         const data = await response.json();
    //         console.log(data, 'data in fix category')
    //     }catch(e) {
    //         console.log(e)
    //     }
    // }

    return(
        <CategoryContext.Provider
            value={{
                categories,
                setCategories,
                createNewCategory,
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategory = () => {
    const context = useContext(CategoryContext);
    if(!context) {
        throw new Error("Please use useCategory Context")
    }
    return context;
}