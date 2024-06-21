import { useState } from "react"
import { Login } from "./forms/Login"
import { SignUp } from "./forms/SignUp";


export const WelcomeComponent = () => {

    const [isLogin, setIsLogin] = useState(false);

    const onButtonClick = (bool: boolean) => {
        setIsLogin(bool)
    }


    const inputRadio = [
        {
            title: 'Signup',
            value: isLogin,
            checked: !isLogin,
            onClick: () => onButtonClick(false)
        },
        {
            title: 'Login',
            value: !isLogin,
            checked: isLogin,
            onClick: () => onButtonClick(true)
        }

    ]

    return(
        <div>
            <div>
                <h1>WalletWhiz</h1>
            </div>
            <div>
                {inputRadio.map((item) => (
                    <label htmlFor="">
                        <input 
                            type="radio"
                            checked={item.checked}
                            onClick={item.onClick} 
                        />
                        {item.title}
                    </label>
                ))}
                {isLogin ? (<Login/>) : (<SignUp/>)}
            </div>
        </div>


    )
}