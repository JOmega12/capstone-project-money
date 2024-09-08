import { useState, useEffect } from "react"
import { useAuth } from "../../providers/AuthProvider"
import { LoginTest } from "./LoginTest";
import { HeaderTest } from "./HeaderTes";
import { RegisterTest } from "./RegisterTest";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";


export const TestComponent = () => {

    const {user, logoutUser, authToken} = useAuth();
    const {money} = useMoney();
    console.log(authToken.access, 'authToken')
    console.log(money, 'money')
    return(
    <>
    <div>
        This is homepage test
        {/* if logged in, say hi else null */}
        {user ? (
        <h3>Hi {`${user.username}`}</h3>
        ): (
            <>
                <div className="flex flex-col"> Please Login</div>
                <LoginTest/>
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
                    <div key={item.id}>
                        <p>{item.transactionName}</p>
                        <p>{item.transactionAmount}</p>
                        <p>{item.createdAt}</p>
                    </div>
                ))
             ): (
                <p>No Transactions Available</p>
             )}
        
            
        {/* get Transactions */}
        </div>
        <div className="mt-10">
            <p>Wanna Track Your Money?</p>
        {/* Make transactions */}
        </div>

    </div>
    </>
    )
}


