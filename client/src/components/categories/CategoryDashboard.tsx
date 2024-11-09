import { faArrowCircleLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import { Navbar } from "../../Navbar";
import { Link } from "react-router-dom";
import { useCategory } from "../../providers/CategoriesProvider";
import { Budget_categories, Transaction } from "../../types/types";
import { useEffect, useState } from "react";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";

export const CategoryDashboard = () => {
  const { deleteTransaction, setEditingId, fixTransaction } =
    useMoney();

  const { categories } = useCategory();
  const { categoryId } = useParams();

  const [singleCategoryState, setSingleCategoryState] = useState<
    Budget_categories | undefined
  >(undefined);

  const deleteThisTransaction = (id: number) => {
    if (id) {
      deleteTransaction(id);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (Array.isArray(categories)) {
      const matchCategory = categories?.find((item) => {
        return item.id === Number(categoryId);
      });

      setSingleCategoryState(matchCategory);
    } else {
      null;
    }
  }, [categories, categoryId]);

  console.log(singleCategoryState, "singleCatState");

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhiz
        </h2>
        <Navbar />
      </header>
      <div className="lg:px-2 mt-5 md:w-3/4">
        <div className="m-10 text-center flex flex-col md:flex-row gap-10 justify-center mb-1">
          <Link to={"/categories"}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="text-red-500 text-3xl"
            />
          </Link>
          {singleCategoryState && (
            <h2 className="text-3xl ">{singleCategoryState.name}</h2>
          )}
        </div>

        <div className="flex md:flex-col justify-center item-center mt-4 text-xl gap-2">
          {singleCategoryState?.transactions &&
          singleCategoryState.transactions.length > 0 ? (
            singleCategoryState.transactions.map((item: Transaction) => (
              <div className="flex mr-2 border-b p-2">
                {/* <div key={item.id} className="border p-4 rounded-lg">{item.transactionName}</div>
                <div className="border p-4 rounded-lg">{item.id}</div> */}
                <div className="flex-1 text-center">
                  <p>{item.transactionName}</p>
                </div>
                <div className="flex-1 text-center">
                  <p>
                    {item.transactionType === "expense"
                      ? `-${item.transactionAmount}`
                      : `${item.transactionAmount}`}
                  </p>
                </div>
                <div className="flex-1 text-center hidden md:block">
                  <p>{item.createdAt}</p>
                </div>

                <div className="flex gap-5 mr-10">
                    {/* <FontAwesomeIcon
                      className="hover:cursor-pointer
                                            text-xl text-amber-600
                                            "
                      icon={faPencil}
                      onClick={() => setEditingId(item.id)}
                    /> */}
                    <FontAwesomeIcon
                      className="hover:cursor-pointer
                                        text-xl text-red-600
                                        "
                      icon={faTrash}
                      onClick={() => deleteThisTransaction(item.id)}
                    />
                  </div>
              </div>
            ))
          ) : (
            <div className="text-center m-10 text-3xl">No Transactions Available</div>
          )}
        </div>
      </div>
    </section>
  );
};
