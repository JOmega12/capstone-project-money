import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Navbar";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCategory } from "../../providers/CategoriesProvider";

export const Categories = () => {

  const { user } = useAuth();
    
  const { categories } = useCategory();

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/:${categoryId}`);
  }


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
          <h2 className="text-3xl ">Categories</h2>
          <Link
            to={"/"}
          >ClickMe</Link>
          {/* <Link
            to={"/add-category"}
            className="border border-red-700 font-bold "
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="p-2 text-4xl text-blue-700"
            />
          </Link> */}
        </div>

        <div className="flex flex-row gap-6 justify-center items-center mt-10 text-xl ">

          {Array.isArray(categories) && user ? (
              categories.map((item) => (
                  <div
                  className="flex md:flex-row gap-10 justify-between mt-4 border border-[#d0d0d0] px-4 py-2 rounded-xl hover:bg-[#7cc681] hover:cursor-pointer"
                  key={item.id}
                  onClick={()=> handleCategoryClick(item.id)}
                  >
                    <div>{item.name}</div>
                  </div>
              ))
          ) : (
              <div>
                No Categories Created
              </div>
          
          )}
        </div>



      </div>
    </section>
  );
};
