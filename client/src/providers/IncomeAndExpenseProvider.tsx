import { Dispatch, FormEvent, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Transaction } from "../types/types";
import { createTransactionAPI, getMoney } from "../api/getMoneyAPI";
import { useAuth } from "./AuthProvider";

type IncomeAndExpenseContextType = {
  createNewTransactionForm: (transaction: Pick<Transaction, "transactionName"| "transactionAmount" | "createdAt" >) => Promise<Transaction | undefined>;
  money: Transaction | null;
  setMoney: Dispatch<SetStateAction<Transaction | null>>;
};

type MoneyProviderProps = {
  children: ReactNode;
};


const MoneyContext = createContext<IncomeAndExpenseContextType | undefined> (undefined);

export const IncomeAndExpenseProvider = ({ children }: MoneyProviderProps) => {

    const { user } = useAuth()
    const [money, setMoney] = useState<Transaction | null>(null);
    const [payHistory, setPayHistory] = useState<Transaction[]>([]);
    const [transactionName, setTransactionName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(0);

    // date functions
    const dateObj = new Date();
    const day = dateObj.getUTCDate();
    const year= dateObj.getUTCFullYear();
    const monthName = dateObj.toLocaleString('default', {month: 'long'});
    const pDay = day.toString().padStart(2,"0");
    const newPaddedDate = `${monthName} ${pDay}, ${year}`

    const refetch = () => {
      getMoney().then(setMoney);
    };

    useEffect(() => {
      refetch();
    }, [])


    // *this creates new income
    const createNewTransactionForm = async ({transactionName, transactionAmount, createdAt} : Pick<Transaction, "transactionName" | "transactionAmount" | "createdAt">): Promise <Transaction | undefined > => {
      try {
        await createTransactionAPI({transactionName, transactionAmount, createdAt});
        await refetch();

        const newMoney = money;
        if(newMoney) {
          return newMoney
        } else {
          return undefined
        }

      } catch(err){
        console.error("Could not create Transaction In Provider", err);
        return undefined
      }
    }

  
    const handleTotalMoneyCalculations = () => {
      const totalMoney = totalIncomeAmount - totalExpenseAmount;
    }


    // *this creates the transaction receipt for income/expense and adds to total amount
    const handleTransactionFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const historyItems = {
        transactionName: transactionName,
        transactionAmount: transactionAmount,
        createdAt: newPaddedDate,
      }

      setPayHistory([...payHistory, historyItems])

      // once submitted, resets all the values/states of the form

    }

  return (
  <MoneyContext.Provider 
    value={{
        money,
        setMoney,
        createNewTransactionForm
  }}>
    {children}
  </MoneyContext.Provider>
    )
};


// eslint-disable-next-line react-refresh/only-export-components
export const useMoney = () => {
  const context = useContext(MoneyContext);
  if(!context){
    throw new Error('Please use useMoney Context');
  }
  return context;
}
