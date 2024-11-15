import { Link } from "react-router-dom";
import { Navbar } from "../../Navbar";
// import { transactionLabels } from "../testItems"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Transaction } from "../../types/types";
import { useAuth } from "../../providers/AuthProvider";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { useCategory } from "../../providers/CategoriesProvider";
import { EditTransaction } from "../forms/EditTransaction";

export const ExpenseDash = () => {
  const { user } = useAuth();
  const { money, deleteTransaction, editingId, setEditingId, fixTransaction } =
    useMoney();

  const { categories } = useCategory();

  const deleteThisTransaction = (id: number) => {
    if (id) {
      deleteTransaction(id);
      window.location.reload();
    }
  };

  const handleSaveChanges = async (id: number, updatedItem: Transaction) => {
    await fixTransaction(id, updatedItem);
    setEditingId(null);
  };

  const getCategoryName = (categoryId: number) => {
    if (Array.isArray(categories)) {
      const category = categories.find(
        (category) => category.id === categoryId
      );
      return category ? category.name : "No Category";
    }
  };

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhiz
        </h2>
        <Navbar />
      </header>
      <div className="py-2 lg:px-2 mt-5 md:w-3/4">
        <div className="m-10 text-center flex justify-center items-center gap-10">
          <h2 className="text-3xl ">Expense</h2>
          <Link
            to={"/add-expense"}
            className="border border-blue-700 font-bold "
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="p-2 text-4xl text-blue-700"
            />
          </Link>
        </div>

        {Array.isArray(money) && user ? (
          money.map((item) => (
            <div
              className="flex md:flex-row gap-10 justify-between mt-4"
              key={item.id}
            >
              {editingId === item.id ? (
                <EditTransaction
                  element={item}
                  onSave={handleSaveChanges}
                  onCancel={() => setEditingId(null)}
                  categories={Array.isArray(categories) ? categories : []}
                />
              ) : (
                <>
                  {item.transactionType === "expense" && (
                    <>
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
                        <p>{`Category: ${getCategoryName(item.category)}`}</p>
                      </div>
                      <div className="flex-1 text-center hidden md:block">
                        <p>{item.createdAt}</p>
                      </div>
                      <div className="flex gap-5 mr-10">
                        <FontAwesomeIcon
                          className="hover:cursor-pointer text-xl text-amber-600"
                          icon={faPencil}
                          onClick={() => setEditingId(item.id)}
                        />
                        <FontAwesomeIcon
                          className="hover:cursor-pointer text-xl text-red-600"
                          icon={faTrash}
                          onClick={() => deleteThisTransaction(item.id)}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <> No Income Transactions Available</>
        )}
      </div>
    </section>
  );
};
