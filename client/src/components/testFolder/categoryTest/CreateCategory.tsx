import { useState } from "react";
import { useCategory } from "../../../providers/CategoriesProvider";





export const CreateCategory = () => {
    const {createNewCategory} = useCategory();
``
    const [categoryName , setCategoryName] = useState("");
    const isCustom = true;

    const handleSubmit = (e: { preventDefault: () => void}) => {
      e.preventDefault();

      setCategoryName("");
      createNewCategory({name: categoryName, is_custom: isCustom})
    }

  return (
    <>
      <form action="" onSubmit={handleSubmit} className="gap-1">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <br />
        <input className="hover:cursor-pointer" type="submit" value="Enter" />
      </form>
    </>
  );
};
