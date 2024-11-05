import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import { Navbar } from "../../Navbar";
import { Link } from "react-router-dom";
import { useCategory } from "../../providers/CategoriesProvider";
import { div } from "framer-motion/client";
import { Budget_categories, Transaction } from "../../types/types";
import { useEffect, useState } from "react";

export const CategoryDashboard = () => {
  
  const {categories} = useCategory();
  // filter categories by its id and then if the same as the parameter id, then show the transactions
  const { categoryId } = useParams();

  const [singleCategoryState, setSingleCategoryState] = useState<Budget_categories | undefined[]>([])

  // console.log(categories)

  // const matchCategory= categories?.find((item) => {
  //   return item.id ===Number(categoryId)
  // })

  useEffect(() => {
    if(Array.isArray(categories)){
      const matchCategory = categories?.find((item) => {
        return item.id ===Number(categoryId)
      })

      setSingleCategoryState(matchCategory)
    } else {
      null
    }
  }, [categories, categoryId])

console.log(singleCategoryState, 'singleCatState')


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
          {/* <div>
            Single category Id Test:
          {`${categoryId}`}
          </div> */}
          <div>
            {singleCategoryState.length > 0
            ? (singleCategoryState.map((item) => (
              <div>{item.name}</div>
            ))) 
            : (null)}
          </div>
          {/* <div>
          {Array.isArray(matchCategory)
            ?? (matchCategory.map((item: Budget_categories[]) => (
              <div>{item.transactions}</div>
            )))
          }
          </div> */}
        </div>
      </div>
    </section>
  );
};
