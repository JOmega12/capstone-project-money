import { useEffect, useState } from "react";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";
import { useCategory } from "../../providers/CategoriesProvider";





export const CreateTest = () => {


    const {categories} = useCategory();
    // const {money} = useCategory();
    
    const { createNewTransactionForm } = useMoney();
    const [transactionName, setTransactionName] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState<"income" | "expense">();
    const [categoryType, setCategoryType] = useState<number | undefined>(undefined);

    useEffect(() => {
        if(categories) {
            if(Array.isArray(categories)){
                setCategoryType(categories[0].id);
            }
                
        }
    }, [categories])


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createNewTransactionForm({transactionName: transactionName, transactionAmount: transactionAmount, transactionType: transactionType, category: categoryType});
        setTransactionName("");
        setTransactionAmount(0)
        setTransactionType(undefined);
        setCategoryType(undefined);

    }
    return(
        <>
            <form action="" onSubmit={handleSubmit} className="gap-1 flex flex-col">
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
                {/* using this to add them into a category using a select */}
                {/* Having trouble with seleected category id default */}
                <div>Category:
                    <select name="category" value={categoryType} id="" onChange={(e) => setCategoryType(Number(e.target.value))}>
                        {
                            Array.isArray(categories) ? (
                                categories.map((item) => (
                                    <>
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    </>
                                ))
                            ):
                            (
                                <div>No Categories Available</div>
                            )
                            
                        }
                    </select>
                </div>
                <br />
                <input className="hover:cursor-pointer" type="submit" value="Enter" />
            </form>
        </>
    )
}