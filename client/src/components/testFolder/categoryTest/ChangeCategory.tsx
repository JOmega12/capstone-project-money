import { useState } from "react"
// import { Budget_categories } from "../../../types/types";


type editFormType = {
    item: {
        id: number,
        name: string,
    };
    onSave:(id: number, updatedItem: {
        // id: number,
        name: string
    }) => void;
    onCancel: () => void;
    // categories: Budget_categories[];
}

export const ChangeCategory = ({item, onSave, onCancel}: editFormType) => {


    
    const [categoryName, setCategoryName] = useState("");
    // const  [editForm, setEditForm] = useState({
    //     id: item.id,
    //     name: item.name,
    // })


    // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     setEditForm({
    //         ...editForm,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleSave = () => {
        if(onSave){
            onSave(item.id, {name:categoryName})
        }
    }  


    return(
        <>
            <div>
                {/* <input type="text" name="name" value={editForm.name} onChange={handleFormChange} placeholder="Change Name"/> */}
                <input type="text" name="name" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder="Change Name"/>
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </>
    )
}