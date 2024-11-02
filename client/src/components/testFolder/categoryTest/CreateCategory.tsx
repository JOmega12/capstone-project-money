import { useState } from "react";
import { useCategory } from "../../../providers/CategoriesProvider";
import { useNavigate } from "react-router-dom";


export const CreateCategory = () => {
    const {createNewCategory} = useCategory();
    const [categoryName , setCategoryName] = useState("");
    const isCustom = true;

    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void}) => {
      e.preventDefault();
      setCategoryName("");
      createNewCategory({name: categoryName, is_custom: isCustom});
      navigate("/income");
      window.location.reload();
    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if(e.key === "Enter") {
        e.preventDefault();
        handleSubmit(e);
      }
    }

  return (
      <form action="" onSubmit={handleSubmit} className="flex flex-col max-[768px]:justify-center items-center py-8 w-full"
      onKeyDown={handleKeyDown}
      >
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
  );
};
