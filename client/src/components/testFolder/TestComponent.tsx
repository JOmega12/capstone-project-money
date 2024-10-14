import { useAuth } from "../../providers/AuthProvider";
import { LoginTest } from "./LoginTest";
import { RegisterTest } from "./RegisterTest";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { CreateTest } from "./CreateTest";
import { EditFormTest } from "./EditFormTest";
import { Transaction } from "../../types/types";
import { useCategory } from "../../providers/CategoriesProvider";

export const TestComponent = () => {
  const { user, logoutUser } = useAuth();
  const { money, totalIncome, totalExpense, netAmount,fixTransaction, editingId, setEditingId, deleteTransaction } = useMoney();
  const { categories } = useCategory();

  const handleSaveChanges = async(id:number, updatedItem: Transaction) => {
    await fixTransaction(id, updatedItem);
    setEditingId(null);
  }

  const deleteThisTransaction = (id: number) => {

    if(id){
      deleteTransaction(id)
      window.location.reload();
    }
  }
  
  // using a helper function to find the name of the associated id of the category name 
  const getCategoryName = (categoryId: number) => {
    if(Array.isArray(categories)){
      const category = categories.find((category) => category.id === categoryId);
      return category ? category.name : "No Category";
    }

  }


  return (
    <>
      <div>
        This is homepage test
        {/* if logged in, say hi else null */}
        {user ? (
          <h3>Hi {`${user.username}`}</h3>
        ) : (
          <>
            <div className="flex flex-col"> Please Login</div>
            <LoginTest />
          </>
        )}
        <div className="mt-10">
          <h2>New User?</h2>
          <br />
          <RegisterTest />
        </div>
        <div className="mt-10">
          <p>Wanna Logout?</p>
          <button onClick={() => logoutUser()}>Log Out</button>
        </div>
        <div className="mt-10">
          <p>Wanna See Your Money?</p>


          {Array.isArray(money) && user ? (
            money.map((item) => (
              <div key={item.id} className="m-2">
                {editingId === item.id ? (
                  <EditFormTest
                    item={item}
                    onSave={handleSaveChanges}
                    onCancel={() => setEditingId(null)}
                  />
                ): 
                (
                <>                
                  <p>{item.transactionName}</p>
                  <p className="text-xl">{item.transactionAmount}</p>
                  <p>{item.transactionType}</p>
                  <p>{item.createdAt}</p>
                  <p>{getCategoryName(item.category)}</p>
                  <div>
                    <p className="text-green-700 hover:cursor-pointer"
                    onClick={() => setEditingId(item.id)}
                    >
                      CHANGE
                    </p>
                    <p className="text-red-700 hover:cursor-pointer"
                      onClick={()=> deleteThisTransaction(item.id)}
                    >DELETE</p>
                  </div>
                </>
                )}
              </div>
            ))
          ) : (
            <p>No Transactions Available</p>
          )}

          
        </div>


        {user ? (
          <div className="mt-10">
            <h2>Your Total So Far: {netAmount}</h2>
            <p>Income: {totalIncome}</p>
            <p>Expense: {totalExpense}</p>
          </div>
        ) : (
          <p>User Not logged in to see total money</p>
        )}


        <div className="mt-10">
          <p>Add Your Money</p>
          <CreateTest />
        </div>

        <div className="mt-10">
          <div>
            <p className="m-6">Categories for user</p>
            
            {Array.isArray(categories) && user ? categories.map((category)=> (
              <>              
                <p>Category Name: {category.name}</p>
                <h4>Transaction name:</h4>
                <ul>
                  {Array.isArray(money) && user ? (
                    money.filter((transaction) => transaction.category === category.id)
                    .map((transaction) => (
                      <li key={transaction.id}>
                        <p>{transaction.transactionName}</p>
                      </li>
                    ))
                  ): (
                    <p>No Transactions Available</p>
                  )}

                </ul>
              </>
            )): 
            (<>
             <p>No categories </p>
            </>
            )
            }
          </div>

          <p className="m-6" >Create Your Category</p>
        </div>
      </div>
    </>
  );
};
