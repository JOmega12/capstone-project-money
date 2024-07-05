import { Navbar } from "../../Navbar"


export const IncomeInputForm = () => {

    return(
        <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
            <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
                <h2 className="text-black text-center pt-10 hidden md:block">WalletWhiz</h2>
                <Navbar />
            </header>
            <div>
                This is the Income INput Form
            </div>
        </section>
    )
}