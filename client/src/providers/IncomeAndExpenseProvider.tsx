import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { IncomeAndExpenseType } from "../types/types";

type IncomeAndExpenseContextType = {
//   createMoney: (
//     newMoney: Pick<
//       IncomeAndExpenseType,
//       | "incomeName"
//       | "totalIncomeAmount"
//       | "incomeDate"
//       | "expenseName"
//       | "totalExpenseAmount"
//       | "expenseDate"
//     >
//   ) => Promise<IncomeAndExpenseType | undefined>;
  money: IncomeAndExpenseType | null;
  setMoney: Dispatch<SetStateAction<IncomeAndExpenseType | null>>;
};

type MoneyProviderProps = {
  children: ReactNode;
};


const MoneyContext = createContext<IncomeAndExpenseContextType | undefined> (undefined);

export const IncomeAndExpenseProvider = ({ children }: MoneyProviderProps) => {

    const [money, setMoney] = useState<IncomeAndExpenseType | null>(null);
    const [payHistory, setPayHistory] = useState([]);
    
    // console.log(money)

    // const refetch = () => {};



  return (
  <MoneyContext.Provider 
    value={{
        money,
        setMoney
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
