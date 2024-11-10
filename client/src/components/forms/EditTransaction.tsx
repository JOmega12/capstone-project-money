import { useState } from "react";
import { Budget_categories, Transaction } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

type editFormType = {
    element: Transaction;
    onSave:(id: number, updatedItem: Transaction) => void;
    onCancel: () => void;
    categories: Budget_categories[];
}

export const EditTransaction = ({element, onSave, onCancel, categories}: editFormType ) => {

    const [editForm, setEditForm] = useState({
        transactionName: element.transactionName || "",
        transactionAmount: element.transactionAmount || 0,
        transactionType: element.transactionType || "",
        id:element.id,
        category: element.category || 0,
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        if(onSave){
            onSave(element.id, editForm)
        }
    }

  return (
    <>
      <div className="flex-1 text-center">
        <input className="w-[120px] text-center" type="text" name="transactionName" value={editForm.transactionName} onChange={handleFormChange} placeholder="Transaction Name"/>
      </div>
      <div className="flex-1 text-center">
        <input type="text" className="w-[120px] text-center" name="transactionAmount" value={editForm.transactionAmount} onChange={handleFormChange} placeholder="Transaction Amount"/>
      </div>

      <div className="flex-1 text-center hidden md:block">
        <select name="transactionType" id="" onChange={handleFormChange} value={editForm.transactionType}>
          <option value=''>Select Type</option>
          <option value='income'>Income</option>
          <option value='expense'>Expense</option>
        </select>
      </div>


      {/* <label htmlFor="">
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
        </label> */}

      <div className="flex-1 text-center hidden md:block">
        <select name="category" value={editForm.category} onChange={handleFormChange}>
            {categories.map((item) => (
                <option key={item.id} value={item.id}> {item.name}</option>
            ))}
        </select>
      </div>
      <div className="flex-1 text-center hidden md:block">
        <p>{element.createdAt}</p>
      </div>
      <div className="flex gap-2 mr-10">
        <button className="text-lg text-green-600" onClick={handleSave}>Save</button>

        
        <button className="text-2xl text-red-600" onClick={onCancel}>
            <FontAwesomeIcon icon={faBan}/>
        </button>
      </div>
    </>
  );
};
