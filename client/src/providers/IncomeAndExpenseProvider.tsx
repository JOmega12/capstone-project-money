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
    transactionInfo: Pick<Transaction, 'transactionName' | 'transactionAmount' | 'transactionType' | 'category'>
  ) => Promise<Transaction | undefined>,

  fixTransaction: ( id:number,
    transactionInfo: Pick<Transaction, 'transactionName' | 'transactionAmount' | 'transactionType' | 'category'>
  ) => Promise<Transaction | undefined>

  deleteTransaction: (id: number) => Promise<Response>,

  transactionName: string ;
  setTransactionName: Dispatch<SetStateAction<string>>;
  transactionAmount: number;
  setTransactionAmount: Dispatch<SetStateAction<number>>;

  totalIncome: number | undefined;
  totalExpense: number | undefined;
  netAmount: number | undefined;

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
  const {authToken, logoutUser, user } = useAuth();


  const [money, setMoney] = useState<Transaction | null>(null);
  const [payHistory, setPayHistory] = useState<Transaction[]>([]);
  const [transactionName, setTransactionName] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);

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
      console.log(data, 'data in income and expense provider')
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
    transactionType, category
  }: Pick<
    Transaction,
    "transactionName" | "transactionAmount" | "transactionType" | 'category'
  >): Promise<Transaction | undefined> => {

    try {
      const response = await fetch('http://127.0.0.1:8000/transactions/api/create/', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken?.access)
        },
        body: JSON.stringify({transactionName, transactionAmount, transactionType, category})
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


  const fixTransaction = async(id:number, {transactionName,
    transactionAmount, transactionType, category}:Pick<Transaction, 'transactionName' | 'transactionAmount' | 'transactionType' | 'category'>): Promise<Transaction | undefined> => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/transactions/api/${id}/update/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken?.access)
        },
        body: JSON.stringify({transactionName, transactionAmount,transactionType, category})
      });

      console.log(response, 'response in fix Transactions')
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json();
      console.log(data, 'data in fix Transactions')
      await refetch();
      return data;
    } catch(e){
      console.log(e);
    }
  }

  const deleteTransaction = async(id: number) => {
    return fetch(`http://127.0.0.1:8000/transactions/api/${id}/delete/`, {
      method: "DELETE",
    }).then((res) => {
      if(!res.ok){
        throw new Error("Failed to delete a transaction" + id);
      }
      return res
    })
  }


  // * this code block is used to calculate the amount of income and expense
  // * this also would help for later chart
  let totalIncome = 0;
  let totalExpense = 0;

  if (user && money) {
    if (!Array.isArray(money)) {
      console.error("Money is not an array", money);
      return null;
    }

    totalIncome =
      money
        .filter((item) => item.transactionType === "income")
        .reduce((acc, item) => acc + parseFloat(item.transactionAmount), 0) ||
      0;

    totalExpense =
      money
        .filter((item) => item.transactionType === "expense")
        .reduce((acc, item) => acc + parseFloat(item.transactionAmount), 0) ||
      0;

  }

  const netAmount = totalIncome - totalExpense;


  return (
    <MoneyContext.Provider
      value={{
        money,
        setMoney,
        createNewTransactionForm,
        fixTransaction,
        deleteTransaction,

        transactionName,
        setTransactionName,
        transactionAmount,
        setTransactionAmount,

        totalIncome,
        totalExpense,
        netAmount,
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
