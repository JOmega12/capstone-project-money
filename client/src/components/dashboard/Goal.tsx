import { useMoney } from "../../providers/IncomeAndExpenseProvider";



export const Goal = () => {

    const {netAmount} = useMoney();

    return(
        <div className="GoalAndChart border-b border-[#87cb8b]">
            <div className="flex flex-col md:flex-row justify-between items-center md:mx-16 my-4 md:mt-10 max-[765px]:gap-6">
                <div className="font-bold text-4xl md:text-6xl">
                    <h1>${`${netAmount}`}</h1>
                </div>
                <div className="">
                    Chart **add chart js**
                </div>
            </div>
        </div>
    )
}