import { ChangeEvent } from "react";




type TextInputsType = {
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    show: boolean;
    message: string;
    type?: 'password' | 'text'
}


export const IncomeAndExpenseInputs = ({label, onChange, value, show, message, type}: TextInputsType) => (
    <div className="mb-4 flex flex-row">
        <label htmlFor="" className="text-xl mb-2 p-3">{label}</label>
        <input 
            type={type}
            className="border border-gray-500 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={onChange} 
            value={value}
        />
        {show ? (<div className="text-red-500">
            {message}
        </div>) : null}
    </div>
)