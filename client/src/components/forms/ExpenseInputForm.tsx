import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Navbar"
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { IncomeAndExpenseInputs } from "../IncomeAndExpense/IncomeAndExpenseInputs"
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";



const transactionNameErrorMessage = "There must be a name";
const transactionAmountErrorMessage = "There must be number";

export const ExpenseInputForm = () => {

    const {transactionName, setTransactionName, transactionAmount, setTransactionAmount} = useMoney();

    // const [transactionName, setTransactionName] = useState("");
    // const [transactionAmount, setTransactionAmount] = useState(0);
    // const [categoryInput, setCategoryInput] = useState("");
  
  
    const transactionNameValid = transactionName.length > 3;
    const transactionAmountValid = isNaN(transactionAmount) && transactionAmount > 0; 
  
  
  
    const handleTransactionAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setTransactionAmount(isNaN(value) ? 0 : value);
    };


    return(
        <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
        <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
          <h2 className="text-black text-center pt-10 hidden md:block">
            WalletWhiz
          </h2>
          <Navbar />
        </header>
        <div className="py-2 flex flex-col justify-center w-full">
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-10">
            <Link to={"/expense"}>
              <FontAwesomeIcon
                icon={faArrowCircleLeft}
                className="text-red-500 text-3xl" 
              />
            </Link>
            <h2 className="text-3xl ">Add Income</h2>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
              <IncomeAndExpenseInputs 
              type={'text'}
              label={`Income Name`}
              value={transactionName}
              onChange={(e) => setTransactionName(e.target.value)}
              show={transactionNameValid}
              message={transactionNameErrorMessage}
              />
              <IncomeAndExpenseInputs 
              type={"number"}
              label={`Income Amount`}
              value={transactionAmount}
              onChange={handleTransactionAmountChange}
              show={transactionAmountValid}
              message={transactionAmountErrorMessage}
              />
          </div>
        </div>
      </section>
    )
}