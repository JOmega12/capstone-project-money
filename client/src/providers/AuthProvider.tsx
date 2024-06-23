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
import { getUserFromServer, registerFetch } from "../api/UserAPI";

type TAuthContext = {
  user: UserInformation | null;
  setUser: Dispatch<SetStateAction<UserInformation | null>>;
  isRegister: boolean;
  registerUser: (user: UserInformation) => Promise<void>;
  loginUser: (
      userInfo: Pick<UserInformation, 'password' | 'username'>
  ) => Promise<UserInformation | undefined>;
  // logoutUser: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserInformation | null>(null);
  const isRegister = !!user;


  console.log(user, 'authprovider')
  const registerUser = async ({username, password} : UserInformation) => {
    registerFetch({username, password}).then((user) => {
      localStorage.setItem("user", JSON.stringify(user))
      return setUser(user)
    })
  }

  const loginUser = async ({username, password}: Pick<UserInformation, 'username' |  'password'>): Promise<UserInformation | undefined> => {
    try {
      const user = getUserFromServer({username, password}).catch(() => null);

      if (!user) {
        throw new Error("there is no user taken from AuthProvider");
      }
      if(user.username !== username) {
        throw new Error("The current username is incorrect/ does not exist")
      }
      if(user?.password !== password) {
        throw new Error("The current password is incorrect")
      }

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return user
    } catch(e) {
      console.error("Error while logging in. Authprovider Problem")
    }
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
        loginUser
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