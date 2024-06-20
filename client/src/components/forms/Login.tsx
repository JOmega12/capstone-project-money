// import { TextInputs } from "../TextInputs"

import { FormEvent, useState } from "react"
import { useNavigate } from "react-router";


export const Login = () => {


    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState(false);
    
    const navigate = useNavigate();


    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if(e.key === "Enter") {
          e.preventDefault();
          handleSubmit(e);
        }
      }


    return(
        <form>
            <div>
                <div>
                    <button></button>
                    <h2>Login</h2>
                </div>
                <div>
                    {/* <TextInputs 
                        type="text"
                        value={}
                        onChange={}
                        show={}
                        message={}
                    /> */}

                </div>
            </div>

        </form>
    )
}