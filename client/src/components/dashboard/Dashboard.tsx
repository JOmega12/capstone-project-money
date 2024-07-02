import { Navbar } from "../../Navbar"
import { Goal } from "./Goal"
import { MonthlyIncome } from "./MonthlyIncome"
import { Transactions } from "./Transactions"


export const Dashboard = () => {

    return(
        <section className="flex flex-row w-full">
            {/* would this header be right? */}
            <header className="flex flex-col border-red-400 border">
                <Navbar />
            </header>
            <section className="flex flex-col border-blue-400 border">
                <Goal />
                <Transactions />
                <MonthlyIncome />
            </section>
        </section>
    )
}