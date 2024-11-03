import { faArrowCircleLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import { Navbar } from "../../Navbar";
import { Link } from "react-router-dom";

export const CategoryDashboard = () => {
  const { categoryId } = useParams();

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhiz
        </h2>
        <Navbar />
      </header>
      <div className="py-2 flex flex-col justify-center w-full">
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-10">
          <Link to={"/categories"}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="text-red-500 text-3xl"
            />
          </Link>
          <h2 className="text-3xl ">Current Category Name</h2>
        </div>

        <div>
          Single category Id
          {`${categoryId}`}
        </div>
      </div>
    </section>
  );
};
