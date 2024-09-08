import { useState } from "react";


export const CreateTest = () => {
    const [transactionName, setTransactionName] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0)


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // add Income API button
    }
    return(
        <>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" value={transactionName} onChange={(e) => setTransactionName(e.target.value)} placeholder="Transaction Name"/>
                <input type="text" value={transactionAmount} onChange={(e) => setTransactionAmount(Number(e.target.value))} placeholder="Transaction Name"/>
                <input type="submit" value="Enter" />
            </form>
        </>
    )
}