import { ChangeEvent } from "react";


type TextInputsType = {
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    show: boolean;
    message: string;
    type?: 'password' | 'text'
}


export const TextInputs = ({label, onChange, value, show, message, type}: TextInputsType) => {
    <div className="flex flex-row">
        <label htmlFor="" className="w-32 text-lg mb-2 p-3">{label}</label>
        <input 
            type={type}
            className="items-center h-14 w-full max-w-md border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={onChange} 
            value={value}
        />
        {show ? (<div className="text-red-500">
            {message}
        </div>) : null}
    </div>
}