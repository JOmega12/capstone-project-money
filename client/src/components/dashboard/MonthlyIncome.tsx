import { MonthlyIncomeChart } from "../charts/MonthlyIncomeChart";

export const MonthlyIncome = () => {
  return (
    <div className="border-[#5adf63] border-b p-4 w-full">
      <div className="flex flex-col md:flex-row justify-center gap-40 max-[765px]:items-center w-full">
        <div className="flex justify-center flex-col w-1/2">
          <h3 className="text-center">Monthly Income</h3>
          <MonthlyIncomeChart />
        </div>
      </div>
    </div>
  );
};
