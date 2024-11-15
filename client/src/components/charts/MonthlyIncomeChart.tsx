import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMoney } from "../../providers/IncomeAndExpenseProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const MonthlyIncomeChart = () => {
  const { money } = useMoney();

  let expenseData: number[] = [];
  let incomeData: number[] = [];
  let dates: string[] = [];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  if (Array.isArray(money)) {
    const monthlyData = money.filter((item) => {
      const itemDate = new Date(item.createdAt);
      return (
        itemDate.getMonth() === currentMonth &&
        itemDate.getFullYear() === currentYear
      );
    });

    incomeData = monthlyData
      .filter((item) => item.transactionType === "income")
      .map((item) => item.transactionAmount);

    expenseData = monthlyData
      .filter((item) => item.transactionType === "expense")
      .map((item) => item.transactionAmount);

    dates = monthlyData.map((item) =>
      new Date(item.createdAt).toLocaleDateString()
    );
  }

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
      {
        label: "Expense",
        data: expenseData,
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data}></Line>;
};
