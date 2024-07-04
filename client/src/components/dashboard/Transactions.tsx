

export const Transactions = () => {


    const transactionLabels = [
        {
            labelName: "Transaction1",
            labelAmount: "Amount1",
            labelCategory: 'Category1',
            labelDate: 'June 1, 2024'
        },
        {
            labelName: "Transaction2",
            labelAmount: "Amount2",
            labelCategory: 'Category2',
            labelDate: 'June 2, 2024'
        },
    ]

    return(
        <div className="border-red-400 border flex flex-col max-[768px]:justify-center items-center py-8 ">
            <h2 className="text-3xl text-center">Recent Transactions</h2>
            <div className="py-2 md:w-full lg:px-2">
                {transactionLabels.map((item, index)=> (
                    <div className="flex md:flex-row gap-10 justify-between border-b mt-6" key={index}>                    
                        <div className="flex-1 text-center">
                            <p>{item.labelName}</p>
                        </div >
                        <div className="flex-1 text-center">
                            <p>{item.labelAmount}</p>
                        </div>
                        <div className="flex-1 text-center hidden md:block">
                            <p>{item.labelCategory}</p>
                        </div>
                        <div className="flex-1 text-center hidden md:block">
                            <p>{item.labelDate}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}