import { useState } from "react";

type editCatType = {
  item: {
    id: number;
    name: string;
  };
  onSave: (
    id: number,
    updatedItem: {
      name: string;
    }
  ) => void;
  onCancel: () => void;
};

export const ChangeCategory = ({ item, onSave, onCancel }: editCatType) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSave = () => {
    if (onSave) {
      onSave(item.id, { name: categoryName });
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          name="name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Change Name"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};
