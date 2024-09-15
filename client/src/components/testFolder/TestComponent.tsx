import { useAuth } from "../../providers/AuthProvider";
import { LoginTest } from "./LoginTest";
import { RegisterTest } from "./RegisterTest";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { CreateTest } from "./CreateTest";

export const TestComponent = () => {
  const { user, logoutUser } = useAuth();
  const { money, totalIncome, totalExpense, netAmount } = useMoney();


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
                <p>{item.transactionName}</p>
                <p className="text-xl">{item.transactionAmount}</p>
                <p>{item.transactionType}</p>
                <p>{item.createdAt}</p>
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
        {/* !TODO: DO THIS NEXT */}
        <div className="mt-10">
          <p>Wanna Track Your Money?</p>
          <CreateTest />
        </div>
      </div>
    </>
  );
};
