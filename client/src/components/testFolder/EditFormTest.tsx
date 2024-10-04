import {useState } from "react";
import { Transaction } from "../../types/types";



type editFormType = {
    item: Transaction;
    onSave:(updatedItem: Transaction) => void;
    onCancel: () => void
}


export const EditFormTest = ({item, onSave, onCancel}: editFormType) => {

    const [editForm, setEditForm] = useState({
        transactionName: item.transactionName || "",
        transactionAmount: item.transactionAmount || 0,
        transactionType: item.transactionType || "",
        id:item.id
        // category: ""
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };
    

    const handleSave = () => {
        if(onSave){
            onSave(editForm)
        }
    }




    return(
        <div className="flex">
            <input type="text" name="transactionName" value={editForm.transactionName} onChange={handleFormChange} placeholder="Transaction Name"/>
            <input type="text" name="transactionAmount" value={editForm.transactionName} onChange={handleFormChange} placeholder="Transaction Name"/>
            <label htmlFor="">
                <input type="radio"
                    value={'income'}
                    name="income"
                    checked={editForm.transactionType === 'income'}
                    onChange={handleFormChange}
                />
                Income
            </label>
            <label htmlFor="">
                <input type="radio" 
                    name="expense"
                    value={'expense'}
                    checked={editForm.transactionType === 'expense'}
                    onChange={handleFormChange}
                />
                Expense
            </label>
            {/* props */}
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}