import { useState } from "react";
import { useCategory } from "../../../providers/CategoriesProvider";
import { useAuth } from "../../../providers/AuthProvider";







export const CreateCategory = () => {
    const {createNewCategory} = useCategory();


    // !need to add isCustom 
    // const {user} = useAuth();
    const [categoryName , setCategoryName] = useState("");
    // const [userId, setUserId] = useState<number | "">("");
    const handleSubmit = (e: { preventDefault: () => void}) => {
      e.preventDefault();

      createNewCategory(categoryName)
      // setUserId("")
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
