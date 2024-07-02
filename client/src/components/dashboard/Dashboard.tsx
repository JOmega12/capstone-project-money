import { Navbar } from "../../Navbar"
import { Goal } from "./Goal"
import { MonthlyIncome } from "./MonthlyIncome"
import { Transactions } from "./Transactions"


export const Dashboard = () => {

    return(
        <section className="flex flex-row w-full min-h-screen justify-center gap-2">
            {/* would this header be right? */}
            <header className="flex flex-col w-1/4 border-red-400 border">
                <Navbar />
            </header>
            <section className="flex flex-col w-3/4 border-blue-400 border">
                <Goal />
                <Transactions />
                <MonthlyIncome />
            </section>
        </section>
    )
}