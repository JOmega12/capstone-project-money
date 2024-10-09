import { useState } from "react";







export const CreateCategory = () => {

    const [categoryName , setCategoryName] = useState("");


  return (
    <>
      <form action="" onSubmit={} className="gap-1">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <br />
        <input type="submit" value="Enter" />
      </form>
    </>
  );
};
