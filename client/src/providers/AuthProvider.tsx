import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
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

    const response = await fetch("http://localhost:8000/users/token/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })

    const data = await response.json();

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
  const updateToken = useCallback( async() => {
    console.log('Token Updated');
    const response = await fetch("http://localhost:8000/users/token/refresh/", {
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
  }, [authToken, loading] )



  useEffect(() => {

    if (loading) {
      updateToken()
    }
    const fourMin = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if(authToken){
        updateToken()
      }
    }, fourMin);
    return () => clearInterval(interval)
  }, [authToken, loading, updateToken])


  return (
    <AuthContext.Provider
      value={{
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