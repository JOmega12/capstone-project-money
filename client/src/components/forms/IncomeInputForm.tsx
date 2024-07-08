import { Link } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowCircleLeft";
import { FormEvent, useState } from "react";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { useAuth } from "../../providers/AuthProvider";
import { IncomeAndExpenseInputs } from "../IncomeAndExpenseInputs";

export const IncomeInputForm = () => {
  const { user } = useAuth();
  const {transactionName, setTransactionName, transactionAmount, setTransactionAmount, newPaddedDate, payHistory, setPayHistory} = useMoney();

  // const [transactionName, setTransactionName] = useState("");
  // const [transactionAmount, setTransactionAmount] = useState(0);
  // const [categoryInput, setCategoryInput] = useState("");


  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhiz
        </h2>
        <Navbar />
      </header>
      <div className="py-2 flex flex-col justify-center w-full">
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-10">
          <Link to={"/income"}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="text-red-500 text-3xl" 
            />
          </Link>
          <h2 className="text-3xl ">Add Income</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
            <IncomeAndExpenseInputs 
            label={`Income Name`}
            value={transactionName}
            onChange={() => setTransactionName(e.target.value)}
            
            />
        </div>
      </div>
    </section>
  );
};
