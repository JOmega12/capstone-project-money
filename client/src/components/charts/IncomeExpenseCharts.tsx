import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMoney } from '../../providers/IncomeAndExpenseProvider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const IncomeExpenseCharts = () => {
  const { money } = useMoney();


let expenseData: number[] = [];
let incomeData: number[] = [];
let dates: string[] = [];

  if(Array.isArray(money)) {

    // const monthlyData = money.reduce((acc, item) => {
    //   const month = new Date(item.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
      
    //   if (!acc[month]) {
    //     acc[month] = { income: 0, expense: 0 };
    //   }
      
    //   if (item.transactionType === 'income') {
    //     acc[month].income += item.transactionAmount;
    //   } else if (item.transactionType === 'expense') {
    //     acc[month].expense += item.transactionAmount;
    //   }

    //   return acc;
    // }, {} as Record<string, { income: number, expense: number }>);

    // dates = Object.keys(monthlyData);
    // incomeData = dates.map(month => monthlyData[month].income);
    // expenseData = dates.map(month => monthlyData[month].expense);

    dates = money.map(item => item.createdAt);
    incomeData = money.filter(item => item.transactionType === 'income').map(item => item.transactionAmount);
    expenseData = money.filter(item => item.transactionType === 'expense').map(item => item.transactionAmount);
}

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        fill: false,
        borderColor: 'green',
        tension: 0.1
      },
      {
        label: 'Expense',
        data: expenseData,
        fill: false,
        borderColor: 'red',
        tension:0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Income vs Expense Over Time'
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Money Gained/Lost'
        },
        beginAtZero: true
      }
    }
  };

  return <Line data={data} 
  options={options} 
  />;
};