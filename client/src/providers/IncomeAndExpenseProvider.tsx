import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Transaction } from "../types/types";
import { createTransactionAPI, getMoney } from "../api/getMoneyAPI";
import { useAuth } from "./AuthProvider";

type IncomeAndExpenseContextType = {
  // createNewTransactionForm: (
  //   transaction: Pick<
  //     Transaction,
  //     "userId" | "transactionName" | "transactionAmount" | "createdAt"
  //   >
  // ) => Promise<Transaction | undefined>;
  money: Transaction | null;
  setMoney: Dispatch<SetStateAction<Transaction | null>>;

  handleTransactionIncomeFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleTransactionExpenseFormSubmit: (e: FormEvent<HTMLFormElement>) => void;

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
  const { user } = useAuth();
  const [money, setMoney] = useState<Transaction | null>(null);
  const [payHistory, setPayHistory] = useState<Transaction[]>([]);
  const [transactionName, setTransactionName] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0)


  const userId = user?.id;
  // date functions
  const dateObj = new Date();
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const monthName = dateObj.toLocaleString("default", { month: "long" });
  const pDay = day.toString().padStart(2, "0");
  const newPaddedDate = `${monthName} ${pDay}, ${year}`;

  const refetch = useCallback(() => {
    if(userId) {
      getMoney(userId).then(setMoney);
    }
  }, [userId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // *this creates new income/expense
  const createNewTransactionForm = async ({
    transactionName,
    transactionAmount,
    createdAt,
    userId,
  }: Pick<
    Transaction,
    "userId" | "transactionName" | "transactionAmount" | "createdAt"
  >): Promise<Transaction | undefined> => {
    try {
      await createTransactionAPI({
        userId,
        transactionName,
        transactionAmount,
        createdAt,
      });
      await refetch();

      const newMoney = money;
      if (newMoney) {
        return newMoney;
      } else {
        return undefined;
      }
    } catch (err) {
      console.error("Could not create Transaction In Provider", err);
      return undefined;
    }
  };


  // *this creates the transaction receipt for income/ and adds to total amount
  const handleTransactionIncomeFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const new_transaction = {
      userId: userId,
      transactionName,
      transactionAmount,
      createdAt: newPaddedDate,
    };

    await createNewTransactionForm(new_transaction)

    setPayHistory([...payHistory, new_transaction]);
    setTotalIncome(totalIncome + transactionAmount)

    setTransactionName("");
    setTransactionAmount(0);

    // once submitted, resets all the values/states of the form
  };


  // *this creates the transaction receipt for income/ and adds to total amount
  const handleTransactionExpenseFormSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const new_transaction = {
      userId: userId,
      transactionName,
      transactionAmount,
      createdAt: newPaddedDate,
    };

    setPayHistory([...payHistory, new_transaction])
    setTotalExpense(totalExpense + transactionAmount)

    setTransactionName("");
    setTransactionAmount(0);
  }

  return (
    <MoneyContext.Provider
      value={{
        money,
        setMoney,

        handleTransactionIncomeFormSubmit,
        handleTransactionExpenseFormSubmit,

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
