import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { useCategory } from "../../providers/CategoriesProvider";
import { EditTransaction } from "../forms/EditTransaction";
import { Transaction } from "../../types/types";
// import { transactionLabels } from "../testItems"

export const Transactions = () => {
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
    <div className="flex flex-col max-[768px]:justify-center items-center py-8 ">
      <h2 className="text-3xl text-center">Recent Transactions</h2>
      <div className="py-2 md:w-full lg:px-2">
        {Array.isArray(money) ? (
          money.map((item) => (
            <div
              className="flex md:flex-row gap-6 justify-between border-b mt-6 pb-2"
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
            </div>
          ))
        ) : (
          <div>No Transactions Available</div>
        )}
      </div>
    </div>
  );
};
