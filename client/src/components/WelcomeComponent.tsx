import axios from "axios"
import { useState, useEffect } from "react"
// import { Login } from "./forms/Login"
// import { SignUp } from "./forms/SignUp";


export const WelcomeComponent = () => {

    // const [isLogin, setIsLogin] = useState(false);
    // const onButtonClick = (bool: boolean) => {
    //     setIsLogin(bool)
    // }

    const [data, setData] = useState([])

    // const inputRadio = [
    //     {
    //         id: 1,
    //         title: 'Signup',
    //         value: isLogin,
    //         checked: !isLogin,
    //         onClick: () => onButtonClick(false)
    //     },
    //     {
    //         id: 2,
    //         title: 'Login',
    //         value: !isLogin,
    //         checked: isLogin,
    //         onClick: () => onButtonClick(true)
    //     }
    // ]

    const fetchData =  async() => {
        // ?1st attempt
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/example/api/`);
            if (!response.ok) {
                throw new Error("something wrong Welcome COmp")
            }
            const result = await response.json();
            // console.log(result);
            setData(result);

        } catch(e) {
            console.error('Error fetch', e)
        }


        // ? 2nd attempt
        // console.log("axios url", `${import.meta.env.VITE_API_URL}/example/api/`); 
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/example/api/`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // });
        // console.log("Axios response", response.data);
        // setData(response.data)

        
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        // <div>
        //     <div>
        //         <h1>WalletWhiz</h1>
        //     </div>
        //     <div>
        //         {inputRadio.map((item) => (
        //             <label htmlFor="" key={item.id}>
        //                 <input 
        //                     type="radio"
        //                     checked={item.checked}
        //                     readOnly
        //                     onClick={item.onClick} 
        //                 />
        //                 {item.title}
        //             </label>
        //         ))}
        //         {isLogin ? (<Login/>) : (<SignUp/>)}
        //     </div>
        // </div>

    <>
        {/* {data.length > 0 ? (
            data.map(item => <div key={data.length}>{item}</div>)
        ): (
            <p>No data found</p>
        )} */}
        {data.map(item =>
            <div key={item.user_id}>
                <p>{item.user_id}</p>
                <p>{item.name}</p>
            </div>
        )}
    </>
    )
}