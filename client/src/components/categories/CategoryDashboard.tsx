import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router"
import { Navbar } from "../../Navbar";
import { Link } from "react-router-dom";


export const CategoryDashboard = () => {


    const {categoryId} = useParams();

    return(

        <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
        <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
          <h2 className="text-black text-center pt-10 hidden md:block">
            WalletWhiz
          </h2>
          <Navbar />
        </header>
        <div className="py-2 lg:px-2 mt-5 md:w-3/4">
          <div className="m-10 text-center flex flex-col md:flex-row gap-10 justify-center mb-1">
            <h2 className="text-3xl ">Categories</h2>
            <Link
              to={"/add-category"}
              className="border border-blue-700 font-bold "
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="p-2 text-4xl text-blue-700"
              />
            </Link>
          </div>

          </div>

            <div>
                Single category Id 
                {`${categoryId}`}
            </div>
          </section>
    )
}