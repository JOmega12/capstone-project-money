import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import { Budget_categories } from "../types/types";

type CategoryContextType = {
  categories: Budget_categories | null;
  setCategories: Dispatch<SetStateAction<Budget_categories | null>>;
  editingIdCat: number | null;
  setEditingIdCat: Dispatch<SetStateAction<number | null>>;

  createNewCategory: ({
    name,
    is_custom,
  }: Pick<Budget_categories, "name" | "is_custom">) => Promise<
    Budget_categories | undefined
  >;

  fixCategory: (
    id: number,
    { name }: Pick<Budget_categories, "name">
  ) => Promise<Budget_categories | undefined>;

  deleteCategory: (id: number) => Promise<Response>;
};

type CategoryProviderProps = {
  children: ReactNode;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoriesProvider = ({ children }: CategoryProviderProps) => {
  const { authToken } = useAuth();

  const [categories, setCategories] = useState<Budget_categories | null>(null);

  const [editingIdCat, setEditingIdCat] = useState<number | null>(null);

  const getCategoryForUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/budget_categories/api/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authToken?.access),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP Error!: ${response.status}`);
      }

      const data = await response.json();
      console.log("data in Category Provider");
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const refetch = async () => {
    const data = await getCategoryForUser();
    if (data) {
      setCategories(data);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const createNewCategory = async ({
    name,
    is_custom,
  }: Pick<Budget_categories, "name" | "is_custom">): Promise<
    Budget_categories | undefined
  > => {
    try {
      const response = await fetch(
        "http://localhost:8000/budget_categories/api/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authToken?.access),
          },
          body: JSON.stringify({ name, is_custom }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP Error!: ${response.status}`);
      }

      const data = await response.json();
      await refetch();
      return data;
    } catch (e) {
      console.log(e, "Error in createNewCategory");
    }
  };

  const fixCategory = async (
    id: number,
    { name }: Pick<Budget_categories, "name">
  ): Promise<Budget_categories | undefined> => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/budget_categories/api/${id}/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authToken?.access),
          },
          body: JSON.stringify({ name }),
        }
      );
      console.log(response, "response in fix Categories");

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data, "data in fix category");
      await refetch();
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  const deleteCategory = async (id: number) => {
    return fetch(`http://127.0.0.1:8000/budget_categories/api/${id}/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + String(authToken?.access),
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete a Category" + id);
      }
      console.log("The Category has been deleted!");
      return res;
    });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        editingIdCat,
        setEditingIdCat,
        createNewCategory,
        fixCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("Please use useCategory Context");
  }
  return context;
};
