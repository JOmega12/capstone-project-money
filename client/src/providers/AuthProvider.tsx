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


type AuthTokenType = {
  refresh: string | null,
  access: string | null
}

type TAuthContext = {
  user: UserInformation | null;
  setUser: Dispatch<SetStateAction<UserInformation | null>>;
  authToken: AuthTokenType | null
  
  isRegister: boolean;
  registerUser: (user: UserInformation) => Promise<void>;
  updateToken: () => Promise<void>
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

  const registerUser = async ({username, password} : UserInformation) => {
    const response = await fetch("http://localhost:8000/users/api/register/", {
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

    const response = await fetch("http://localhost:8000/users/api/token/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    console.log(response, 'response')
    const data = await response.json();
    // console.log(data, 'data in login')
    if(response.status === 200) {
      setAuthToken(data);
      const decodeUser: UserInformation = jwtDecode(data.access)
      setUser(decodeUser);
      localStorage.setItem('authToken', JSON.stringify(data));
      return decodeUser
    } else {
      alert("Something went wrong in Login User Context")
      throw new Error('Something Went Wrong in Login AuthProvider Context')
      // return undefined
    }
  }

  const logoutUser = () => {
    console.log("You've been logged out")
    setAuthToken(null)
    setUser(null);
    localStorage.removeItem("authToken");
  }


  // double check useCallBack function and see if it works
  const updateToken = async() => {
    console.log('Token Updated');
    const response = await fetch("http://localhost:8000/users/api/token/refresh/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'refresh': authToken?.refresh})
    })

    const data = await response.json();
    if(response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data))
    } else {
      logoutUser()
    }
    if(loading) {
      setLoading(false);
    }
  }



  useEffect(() => {

    const checkTokenExpiry = () => {
      if(authToken?.access){
        const decodedToken = jwtDecode(authToken.access);
        const currentTime = Date.now() / 1000;
        const tokenExpiryTime = decodedToken?.exp;

        if(tokenExpiryTime && tokenExpiryTime - currentTime < 60) {
          updateToken()
        }
      }
    }

    if (loading) {
      checkTokenExpiry()
    }
    const fourMin = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if(authToken){
        checkTokenExpiry();
      }
    }, fourMin);
    return () => clearInterval(interval)
  }, [authToken, loading])


  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        setUser,
        isRegister,
        registerUser,
        loginUser,
        updateToken,
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