import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";


export const LoginTest = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {loginUser} = useAuth();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // setLogin User(username and password)
    loginUser({username: username, password: password});
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} id="" placeholder='Enter Username' />
        <input type="text" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} id="" placeholder='Enter Password' />
        <input type="submit" />

      </form>
    </div>
  )
}