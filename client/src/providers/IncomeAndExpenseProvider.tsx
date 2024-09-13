import {
  Dispatch,
  // FormEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Transaction } from "../types/types";
// import { createTransactionAPI, getMoney } from "../api/getMoneyAPI";
import { useAuth } from "./AuthProvider";

type IncomeAndExpenseContextType = {
  money: Transaction | null;
  setMoney: Dispatch<SetStateAction<Transaction | null>>;

  createNewTransactionForm: (
    transactionInfo: Pick<Transaction, 'transactionName' | 'transactionAmount' | 'transactionType'>
  ) => Promise<Transaction | undefined>,
  
  // handleTransactionIncomeFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  // handleTransactionExpenseFormSubmit: (e: FormEvent<HTMLFormElement>) => void;

  transactionName: string ;
  setTransactionName: Dispatch<SetStateAction<string>>;
  transactionAmount: number;
  setTransactionAmount: Dispatch<SetStateAction<number>>;

  totalIncome: number | undefined;
  setTotalIncome: Dispatch<SetStateAction<number>>;
  totalExpense: number | undefined;
  setTotalExpense: Dispatch<SetStateAction<number>>;

  newPaddedDate: string | undefined;
  payHistory: (Transaction | undefined) [];


  setPayHistory: Dispatch<SetStateAction<Transaction[]>>;
};

type MoneyProviderProps = {
  children: ReactNode;
};

const MoneyContext = createContext<IncomeAndExpenseContextType | undefined>(
  undefined
);

export const IncomeAndExpenseProvider = ({ children }: MoneyProviderProps) => {
  
  // getting the user authToken to get the items
  const { user, authToken, logoutUser } = useAuth();


  const [money, setMoney] = useState<Transaction | null>(null);
  const [payHistory, setPayHistory] = useState<Transaction[]>([]);
  const [transactionName, setTransactionName] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0)



  // const userId = user?.id;
  // date functions
  const dateObj = new Date();
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const monthName = dateObj.toLocaleString("default", { month: "long" });
  const pDay = day.toString().padStart(2, "0");
  const newPaddedDate = `${monthName} ${pDay}, ${year}`;


  const getUserMoney = async() => {
    try {
      const response = await fetch("http://localhost:8000/transactions/api/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + String(authToken?.access)
        }
      });
      if(!response.ok) {
        throw new Error(`HTTP error!: ${response.status}`)
      }
      if(response.statusText === 'Unauthorized'){
        logoutUser()
      }

      const data = await response.json();
      // console.log(response, 'response in item and expense provider');
      // console.log(data, 'data in income and expense provider')
      return data;
    }catch(e) {
      console.log(e);
      return null;
    }
  }

  const refetch = async() => {
    const data = await getUserMoney();
    if(data){
      setMoney(data)
    }
  };

  useEffect(() => {
    refetch();
  }, []);


  // *this creates new income/expense
  const createNewTransactionForm = async ({
    transactionName,
    transactionAmount,
    transactionType
  }: Pick<
    Transaction,
    "transactionName" | "transactionAmount" | "transactionType"
  >): Promise<Transaction | undefined> => {

    try {
      const response = await fetch('http://127.0.0.1:8000/transactions/api/create/', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken?.access)
        },
        body: JSON.stringify({transactionName, transactionAmount, transactionType})
      });

      if(!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json();
      await refetch();
      return data

    } catch (err) {
      console.log("Could not create Transaction In Provider", err);
      return undefined;
    }
  };


  // *this creates the transaction receipt for income/ and adds to total amount
  // const handleTransactionIncomeFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const new_transaction = {
  //     userId: userId,
  //     transactionName,
  //     transactionAmount,
  //     transactionType,
  //     createdAt: newPaddedDate,
  //   };

  //   await createNewTransactionForm(new_transaction)

  //   setPayHistory([...payHistory, new_transaction]);
  //   setTotalIncome(totalIncome + transactionAmount)

  //   setTransactionName("");
  //   setTransactionAmount(0);

  //   // once submitted, resets all the values/states of the form
  // };


  // *this creates the transaction receipt for income/ and adds to total amount
  // const handleTransactionExpenseFormSubmit = (e:FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const new_transaction = {
  //     userId: userId,
  //     transactionName,
  //     transactionAmount,
  //     createdAt: newPaddedDate,
  //   };

  //   setPayHistory([...payHistory, new_transaction])
  //   setTotalExpense(totalExpense + transactionAmount)

  //   setTransactionName("");
  //   setTransactionAmount(0);
  // }




  return (
    <MoneyContext.Provider
      value={{
        money,
        setMoney,

        createNewTransactionForm,
        // handleTransactionIncomeFormSubmit,
        // handleTransactionExpenseFormSubmit,

        transactionName,
        setTransactionName,
        transactionAmount,
        setTransactionAmount,

        totalIncome,
        setTotalIncome,
        totalExpense,
        setTotalExpense,
        newPaddedDate,

        payHistory,
        setPayHistory,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMoney = () => {
  const context = useContext(MoneyContext);
  if (!context) {
    throw new Error("Please use useMoney Context");
  }
  return context;
};
