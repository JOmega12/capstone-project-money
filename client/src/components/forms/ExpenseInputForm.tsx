import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Navbar";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { IncomeAndExpenseInputs } from "../IncomeAndExpense/IncomeAndExpenseInputs";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../../providers/CategoriesProvider";

const transactionNameErrorMessage = "There must be a name";
const transactionAmountErrorMessage = "There must be number";

export const ExpenseInputForm = () => {
  const {
    transactionName,
    setTransactionName,
    transactionAmount,
    setTransactionAmount,
    setTransactionType,
    createNewTransactionForm,
  } = useMoney();

  const { categories } = useCategory();

  const [categoryType, setCategoryType] = useState<number | undefined>(
    undefined
  );

  const navigation = useNavigate();

  const transactionNameValid =
    transactionName.length < 3 && transactionName.length > 0;
  const transactionAmountValid =
    isNaN(transactionAmount) && transactionAmount > 0;

  const expenseTypeTransaction = "expense";

  const handleTransactionAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTransactionAmount(value);
  };

  useEffect(() => {
    if (categories) {
      if (Array.isArray(categories)) {
        setCategoryType(categories[0].id);
      }
    }
  }, [categories]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createNewTransactionForm({
      transactionName,
      transactionAmount,
      transactionType: expenseTypeTransaction,
      category: categoryType,
    });
    setTransactionName("");
    setTransactionAmount(0);
    setTransactionType(undefined);
    setCategoryType(undefined);
    navigation("/expense");
    window.location.reload();
  };

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhiz
        </h2>
        <Navbar />
      </header>
      <form className="py-2 lg:px-2 mt-20 md:w-3/4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-10">
          <Link to={"/expense"}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="text-red-500 text-3xl"
            />
          </Link>
          <h2 className="text-3xl ">Add Expense</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <IncomeAndExpenseInputs
            type={"text"}
            label={`Income Name`}
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            show={transactionNameValid}
            message={transactionNameErrorMessage}
          />
          <IncomeAndExpenseInputs
            type={"text"}
            label={`Expense Amount`}
            value={Number(transactionAmount)}
            onChange={handleTransactionAmountChange}
            show={transactionAmountValid}
            message={transactionAmountErrorMessage}
          />

          <div className="mb-4 flex flex-row items-center text-xl gap-2">
            Category:
            <select
              name="category"
              value={categoryType}
              id=""
              onChange={(e) => setCategoryType(Number(e.target.value))}
              className="text-xl mb-2 py-3 mx-2 focus:border-blue-500 border border-gray-500 rounded-lg"
            >
              {Array.isArray(categories)
                ? categories.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="border border-gray-500 rounded-lg py-2 focus:outline-none focus:border-blue-500 text-center"
                    >
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="hover:cursor-pointer border border-green-400 px-6 py-2 rounded-xl bg-white hover:bg-green-400 hover:text-black">
            <input type="submit" value={"Submit "} />
          </div>
        </div>
      </form>
    </section>
  );
};
