import { useMoney } from "../../providers/IncomeAndExpenseProvider"

export const MonthlyIncome = () => {

    const {totalIncome, netAmount} = useMoney();


    return(
        <div className="border-[#5adf63] border-t border-b p-4 w-full">
            <div className="flex flex-col md:flex-row justify-center gap-40 max-[765px]:items-center">
                <div className="">
                    <h3>Monthly Income</h3>
                    <div>
                        <p>${totalIncome}</p>
                    </div>
                </div>
                <div className="">
                    <h3>Your Savings</h3>
                    <p>${netAmount}</p>
                </div>
            </div>
        </div>
    )
}