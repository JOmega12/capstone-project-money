import { Dispatch, FormEvent, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ExpenseType, IncomeAndExpenseType, IncomeType } from "../types/types";
import { createNewIncomeAPI, getMoney } from "../api/getMoneyAPI";

type IncomeAndExpenseContextType = {
  createNewIncomeForm: (newIncome: Pick<IncomeType, "incomeName"| "totalIncomeAmount" | "incomeDate" >) => Promise<IncomeType | undefined>;
  createNewExpenseForm: (newExpense: Pick<ExpenseType, "expenseName" | "totalExpenseAmount" | "expenseDate">) => Promise<ExpenseType | undefined>;
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
    const [incomeName, setIncomeName] = useState('');
    const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
    const [expenseName, setExpenseName] = useState('');
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
    
    // console.log(money)

    // const refetch = () => {};


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


    // !do i need to do a pick on the createNewIncomeAPI?
    // *this creates new income
    const createNewIncomeForm = async ({incomeName, totalIncomeAmount, incomeDate} : Pick<IncomeType, "incomeName" | "totalIncomeAmount" | "incomeDate">): Promise <IncomeType | undefined > => {
      try {
        await createNewIncomeAPI({incomeName, totalIncomeAmount, incomeDate});
        await refetch();

        const newMoney = money;
        if(newMoney) {
          return newMoney
        } else {
          return undefined
        }

      } catch(err){
        console.error("Could not create New Money In Provider", err);
        return undefined
      }
    }
    
    // *this create new expense
    const createNewExpenseForm = async() => {

    }


    const handleTotalMoneyCalculations = () => {
      const totalMoney = totalIncomeAmount - totalExpenseAmount;
    }



    // *this creates the transaction receipt for income and adds to total amount
    const handleIncomeFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const historyIncomeItems = {
        incomeName: incomeName,
        totalIncomeAmount: totalIncomeAmount,
        incomeDate: newPaddedDate,
      }

      // ! i get a type error
      // setPayHistory([...payHistory, historyItems])

      // once submitted, resets all the values/states of the form

    }

    // *this creates the transaction receipt for expense  and adds to total amount
    const handleExpenseFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const historyExpenseItems = {
        expenseName: expenseName,
        totalExpenseAmount: totalExpenseAmount,
        expenseDate: newPaddedDate
      }

    }

  return (
  <MoneyContext.Provider 
    value={{
        money,
        setMoney,
        createNewIncomeForm
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
