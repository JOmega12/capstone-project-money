import { useState } from "react"
import { useAuth } from "./AuthProvider";


export const CategoriesProvider = () => {
    
    const {authToken} = useAuth();
    
    const [categories, setCategories] = useState([]);

    const getCategoriesForUser = async() => {
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
}