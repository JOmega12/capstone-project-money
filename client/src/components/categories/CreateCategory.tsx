import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useCategory } from "../../providers/CategoriesProvider";
import { useState } from "react";

export const CreateCategory = () => {
  const { createNewCategory } = useCategory();
  const [categoryName, setCategoryName] = useState("");
  const isCustom = true;

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCategoryName("");
    createNewCategory({ name: categoryName, is_custom: isCustom });
    navigate("/income");
    window.location.reload();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen gap-6">
      <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
        <h2 className="text-black text-center pt-10 hidden md:block">
          WalletWhiz
        </h2>
        <Navbar />
      </header>
      <div className="py-2 lg:px-2 mt-20 md:w-3/4 max-[765px]:mx-4">
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-10">
          <Link to={"/categories"}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="text-red-500 text-3xl"
            />
          </Link>
          <h2 className="text-3xl ">Create Category</h2>
        </div>
          <form
            className="flex flex-col justify-center items-center w-full"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            {/* add income and category  */}
            {/* reference the createTest form */}
            <div className="mb-4 flex flex-row items-center text-xl gap-2">
              Category:
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category Name"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <input
              className="hover:cursor-pointer border border-green-400 px-6 py-2 rounded-xl bg-white hover:bg-green-400 hover:text-black"
              type="submit"
              value="Submit "
            />
          </form>
      </div>
    </section>
  );
};
