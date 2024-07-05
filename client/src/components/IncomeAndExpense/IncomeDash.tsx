import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Navbar } from "../../Navbar"
import { transactionLabels } from "../testItems"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


export const IncomeDash = () => {

    return(
        <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
            <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
                <h2 className="text-black text-center pt-10 hidden md:block">WalletWhiz</h2>
                <Navbar />
            </header>
            <div className="py-2 lg:px-2 mt-5 md:w-3/4">
                <div className="m-10 text-center flex justify-center items-center gap-10">
                    <h2 className="text-3xl ">Income</h2>
                    <Link to={"/add-income"} className="border border-blue-700 font-bold ">
                        <FontAwesomeIcon icon={faPlus}
                        className="p-2 text-4xl text-blue-700"
                        />
                    </Link>
                </div>

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
        </section>
    )
}