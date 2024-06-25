import { Navbar } from "../../Navbar"
import { Goal } from "./Goal"
import { MonthlyIncome } from "./MonthlyIncome"
import { Transactions } from "./Transactions"


export const Dashboard = () => {

    return(
        <section className="flex flex-row w-full">
            {/* would this header be right? */}
            <header>
                <Navbar />
            </header>
            <section className="flex flex-col">
                <Goal />
                <Transactions />
                <MonthlyIncome />
            </section>
        </section>
    )
}