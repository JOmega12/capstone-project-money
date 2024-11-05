import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import { Navbar } from "../../Navbar";
import { Link } from "react-router-dom";
import { useCategory } from "../../providers/CategoriesProvider";

export const CategoryDashboard = () => {
  
  const {categories} = useCategory();
  // filter categories by its id and then if the same as the parameter id, then show the transactions
  const { categoryId } = useParams();

  // console.log(categories)

  const matchCategory = Array.isArray(categories) ? categories.filter((item) => item.id === Number(categoryId) ? item.transactions : null): null

  console.log(matchCategory, 'test')

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhiz
        </h2>
        <Navbar />
      </header>
      <div className="py-2 lg:px-2 mt-5 md:w-3/4">
        <div className="m-10 text-center flex flex-col md:flex-row gap-10 justify-center mb-1">
          <Link to={"/categories"}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="text-red-500 text-3xl"
            />
          </Link>
          <h2 className="text-3xl ">Current Category Name</h2>
        </div>

        <div className="flex flex-row gap-6 justify-center items-center mt-10 text-xl ">
          <div>
            Single category Id
          {`${categoryId}`}
          </div>
        </div>
      </div>
    </section>
  );
};
