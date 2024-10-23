import { useState } from "react"
import { Budget_categories } from "../../../types/types";


type editFormType = {
    item: Budget_categories;
    onSave:(id: number, updatedItem: Budget_categories) => void;
    onCancel: () => void;
    categories: Budget_categories[];
}

export const ChangeCategory = ({item, onSave, onCancel, categories}: editFormType) => {


    
    const [categoryName, setCategoryName] = useState("");



    const handleSave = () => {
        if(onSave){
            
        }
    }  


    return(
        <>
        <div
            onSubmit={handleSubmit}
        >
            <input type="text" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Change Name"/>
            <button>Save</button>
            <button>Cancel</button>
        </div>
        </>
    )
}