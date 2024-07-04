import { Navbar } from "../../Navbar"
import { Goal } from "./Goal"
import { MonthlyIncome } from "./MonthlyIncome"
import { Transactions } from "./Transactions"


export const Dashboard = () => {

    return(
        <section className="flex flex-col md:flex-row  min-h-screen justify-center max-[765px]:items-center gap-2 lg:w-full">
            {/* would this header be right? */}
            <header className="flex flex-col md:w-1/4 border-red-400 border">
                <Navbar />
            </header>
            <section className="flex flex-col md:w-3/4 w-full border-blue-400 border">
                <Goal />
                <Transactions />
                <MonthlyIncome />
            </section>
        </section>
    )
}