import { Navbar } from "../../Navbar"
import { Goal } from "./Goal"
import { MonthlyIncome } from "./MonthlyIncome"
import { Transactions } from "./Transactions"


export const Dashboard = () => {

    return(
        <section className="flex flex-col md:flex-row  min-h-screen justify-center max-[765px]:items-center gap-2 md:w-full">
            {/* would this header be right? */}
            <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
                <h2 className="text-black text-center pt-10 hidden md:block">WalletWhiz</h2>
                <Navbar />
            </header>
            <section className="flex flex-col md:w-3/4 w-full ">
                <Goal />
                <Transactions />
                <MonthlyIncome />
            </section>
        </section>
    )
}