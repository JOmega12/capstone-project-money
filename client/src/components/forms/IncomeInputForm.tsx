import { Link } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowCircleLeft";
import { useState } from "react";

export const IncomeInputForm = () => {
  const [transactionNameInput, setTransactionNameInput] = useState("");
  const [amountInput, setAmountInput] = useState(0);
  const [categoryInput, setCategoryInput] = useState("");

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhiz
        </h2>
        <Navbar />
      </header>
      <div className="py-2 flex flex-col justify-center w-full">
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          <Link to={"/income"}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="text-red-500"
            />
          </Link>
          <h2>Add Income</h2>
        </div>
        <div className="flex flex-col justify-center">
        
        </div>
      </div>
    </section>
  );
};
