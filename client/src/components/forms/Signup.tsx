import { useState } from "react";
import { useNavigate } from "react-router";
import { TextInputs } from "../TextInputs";


export const SignUp = () => {


    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPass, setConfirmPass] = useState('')
    
    const [error, setError] = useState(false);

    const navigate = useNavigate();


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
                    <h2>SignUp</h2>
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