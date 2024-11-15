import { useNavigate } from "react-router";
import { Navbar } from "../../Navbar";
import { useAuth } from "../../providers/AuthProvider";
import { Goal } from "./Goal";
import { MonthlyIncome } from "./MonthlyIncome";
import { Transactions } from "./Transactions";

export const Dashboard = () => {
  const { isRegister } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      {isRegister ? (
        <section className="flex flex-col md:flex-row  min-h-screen justify-center max-[765px]:items-center gap-2 md:w-full">
          <header className="flex flex-col md:w-1/4 md:bg-[#87cb8b] md:text-white text-2xl">
            <h2 className="text-black text-center pt-10 hidden md:block">
              WalletWhiz
            </h2>
            <Navbar />
          </header>
          <section className="flex flex-col md:w-3/4 w-full ">
            <Goal />
            <Transactions />
            <MonthlyIncome />
          </section>
        </section>
      ) : (
        <div className=" text-center flex flex-col gap-6">
          <h2 className="text-red-600 text-3xl">
            You need to login/ signup first
          </h2>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="cursor-auto bg-lime-300 mx-20 p-2 rounded-xl hover:text-red-400"
          >
            Login/Signup Here
          </button>
        </div>
      )}
    </>
  );
};
