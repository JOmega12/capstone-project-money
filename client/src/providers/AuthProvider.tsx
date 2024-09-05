import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserInformation } from "../types/types";
// import { getUserFromServer, registerFetch } from "../api/UserAPI";
import { jwtDecode } from "jwt-decode";


type TAuthContext = {
  user: UserInformation | null;
  setUser: Dispatch<SetStateAction<UserInformation | null>>;
  isRegister: boolean;
  registerUser: (user: UserInformation) => Promise<void>;
  loginUser: (
      userInfo: Pick<UserInformation, 'password' | 'username'>
  ) => Promise<UserInformation | undefined>;
  logoutUser: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [authToken, setAuthToken] = useState(() => {
    const token =localStorage.getItem('authToken');
    return token ? JSON.parse(token) : null;
  })
  const [user, setUser] = useState<UserInformation | null>(()=>{
    const token = localStorage.getItem('authToken');
    return token ? jwtDecode(token) : null
  });

  const [loading, setLoading] = useState(true);
  const isRegister = !!user;




  // console.log(user, 'authprovider')
  const registerUser = async ({username, password} : UserInformation) => {
    const response = await fetch("http://localhost:8000/users/register/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    })

    const data = await response.json();

    if(response.status === 200) {
      setAuthToken(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem('authToken', JSON.stringify(data))
    } else {
      alert("Something went wrong in the Register Context")
      throw new Error(`Something went wrong in the Register Context`)
    }
    
  }

  const loginUser = async ({username, password}: Pick<UserInformation, 'username' |  'password'>): Promise<UserInformation | undefined> => {

  }

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  }


  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if(maybeUser){
      try{
        setUser(JSON.parse(maybeUser))
      } catch(err) {
        console.log("Error parsing data", err)
      }
    }
  }, [])


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isRegister,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error ("Please use `Auth Hook` in Auth Context" )
  }
  return context;
}