import { useState } from "react";
import { useCategory } from "../../../providers/CategoriesProvider";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


export const CreateCategory = () => {
    const {createNewCategory} = useCategory();
    const [categoryName , setCategoryName] = useState("");
    const isCustom = true;

    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void}) => {
      e.preventDefault();
      setCategoryName("");
      createNewCategory({name: categoryName, is_custom: isCustom});
      navigate("categories");
      window.location.reload();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if(e.key === "Enter") {
        e.preventDefault();
        handleSubmit(e);
      }
    }

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhizTest
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
          <h2 className="text-3xl ">Add Category</h2>
        </div>
        </div>

        <form action="" onSubmit={handleSubmit} className="flex flex-col max-[768px]:justify-center items-center py-8 w-full"
        onKeyDown={handleKeyDown}
        >
          test
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-500"
          />
          <input className="hover:cursor-pointer bg-blue-500 text-white rounded-lg py-2 px-6 w-full max-w-xs
          " type="submit" value="Enter" />
        </form>
      </section>
  );
};
