import { Link } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowCircleLeft";
import { ChangeEvent, useEffect, useState} from "react";
import { IncomeAndExpenseInputs } from "../IncomeAndExpense/IncomeAndExpenseInputs";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { useCategory } from "../../providers/CategoriesProvider";



const transactionNameErrorMessage = "There must be a name";
const transactionAmountErrorMessage = "There must be number";
// const categoryErrorMessage = "There must be a category"


export const IncomeInputForm = () => {

  const {transactionName, setTransactionName, transactionAmount, setTransactionAmount, setTransactionType, createNewTransactionForm} = useMoney();

  const {categories} = useCategory();


  const [categoryType, setCategoryType] = useState<number | undefined>(undefined);

  const transactionNameValid = transactionName.length > 3;
  const transactionAmountValid = isNaN(transactionAmount) && transactionAmount > 0; 

  const incomeTypeTransaction = 'income';

  const handleTransactionAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTransactionAmount(isNaN(value) ? 0 : value);
  };

  useEffect(()=> {
    if(categories){
      if(Array.isArray(categories)) {
        setCategoryType(categories[0].id)
      }
    }
  }, [categories])

  const handleSubmit = (e:{preventDefault: () => void;}) => {
    e.preventDefault();
    createNewTransactionForm({transactionName, transactionAmount, transactionType: incomeTypeTransaction, category: categoryType});
    setTransactionName("");
    setTransactionAmount(0);
    setTransactionType(undefined);
    setCategoryType(undefined);
  }

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
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full"
        >
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
            {/* add income and category  */}
            {/* reference the createTest form */}

            <div className="mb-4 flex flex-row items-center text-xl gap-2">Category:
                <select name="category" value={categoryType} id="" onChange={(e) => setCategoryType(Number(e.target.value))}
                className="text-xl mb-2 py-3 mx-2 focus:border-blue-500 border border-gray-500 rounded-lg"  
                >
                    {
                        Array.isArray(categories) ? (
                            categories.map((item) => (
                                <option key={item.id} value={item.id}
                                className="border border-gray-500 rounded-lg py-2 focus:outline-none focus:border-blue-500 text-center"
                                >{item.name}</option>
                            ))
                        ):
                        (null)
                        
                    }
                </select>
            </div>
            <input className="hover:cursor-pointer border border-green-400 px-6 py-2 rounded-xl bg-white hover:bg-green-400 hover:text-black" type="submit" value="Submit "/>
        </form>
      </div>
  </section>

  );
};
