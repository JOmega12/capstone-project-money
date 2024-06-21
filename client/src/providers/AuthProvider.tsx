import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UserInformation } from "../types/types";

type TAuthContext = {
  user: UserInformation | null;
  setUser: Dispatch<SetStateAction<UserInformation | null>>;
  isRegister: boolean;
  // registerUser: (user: UserInformation) => Promise<void>;
  // loginUser: (
  //     userInfo: Pick<UserInformation, 'password' | 'username'>
  // ) => Promise<UserInformation | undefined>;
  // logoutUser: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserInformation | null>(null);
  const isRegister = !!user;

  


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isRegister,
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