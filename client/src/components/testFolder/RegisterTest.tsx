import { useState } from "react";
// import { useAuth } from "../../providers/AuthProvider";


export const RegisterTest = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const { registerUser }= useAuth();


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // registerUser(username, password)
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username'/>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'/>
            <input type="submit" />
        </form>
    )
}