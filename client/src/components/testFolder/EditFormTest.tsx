import {useState } from "react";
import { Transaction } from "../../types/types";



type editFormType = {
    item: Transaction;
    onSave:(id: number, updatedItem: Transaction) => void;
    onCancel: () => void;
    categories: Transaction[];
}


export const EditFormTest = ({item, onSave, onCancel, categories}: editFormType) => {

    const [editForm, setEditForm] = useState({
        transactionName: item.transactionName || "",
        transactionAmount: item.transactionAmount || 0,
        transactionType: item.transactionType || "",
        id:item.id,
        category: item.category || 0,
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };
    

    const handleSave = () => {
        if(onSave){
            onSave(item.id, editForm)
        }
    }



    return(
        <div className="flex flex-col gap-2">
            <input type="text" name="transactionName" value={editForm.transactionName} onChange={handleFormChange} placeholder="Transaction Name"/>
            <input type="text" name="transactionAmount" value={editForm.transactionAmount} onChange={handleFormChange} placeholder="Transaction Amount"/>
            <label htmlFor="">
                <input type="radio"
                    name="transactionType"
                    value={'income'}
                    checked={editForm.transactionType === 'income'}
                    onChange={handleFormChange}
                />
                Income
            </label>
            <label htmlFor="">
                <input type="radio" 
                    name="transactionType"
                    value={'expense'}
                    checked={editForm.transactionType === 'expense'}
                    onChange={handleFormChange}
                />
                Expense
            </label>
            {/* How do i change this with the choices of the categories i created than the id that is associated with the category name */}
            <label htmlFor="">
                <input type="text" 
                    name="category"
                    value={editForm.category}
                    onChange={handleFormChange}
                />
                Category Name:
            </label>
            {/* props */}
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}