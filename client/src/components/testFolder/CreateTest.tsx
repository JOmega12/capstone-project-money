import { useState } from "react";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";


export const CreateTest = () => {

    const { createNewTransactionForm } = useMoney();
    const [transactionName, setTransactionName] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState<"income" | "expense">();

    // !cant submit new form or new transaction
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createNewTransactionForm({transactionName: transactionName, transactionAmount: transactionAmount, transactionType: transactionType})
    }
    return(
        <>
            <form action="" onSubmit={handleSubmit} className="gap-1">
                <input type="text" value={transactionName} onChange={(e) => setTransactionName(e.target.value)} placeholder="Transaction Name"/>
                <input type="text" value={transactionAmount} onChange={(e) => setTransactionAmount(Number(e.target.value))} placeholder="Transaction Name"/>
                <label htmlFor="">
                    <input type="radio" value={'income'}
                        checked={transactionType === 'income'}
                        onChange={()=>setTransactionType('income')}
                    />
                    Income
                </label>
                <label htmlFor="">
                    <input type="radio" value={'expense'}
                        checked={transactionType === 'expense'}
                        onChange={()=>setTransactionType('expense')}
                    />
                    Expense
                </label>
                <br />
                <input type="submit" value="Enter" />
            </form>
        </>
    )
}