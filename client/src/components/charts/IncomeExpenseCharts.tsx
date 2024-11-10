import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMoney } from '../../providers/IncomeAndExpenseProvider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const IncomeExpenseCharts = () => {
  const { money, totalIncome, totalExpense, dates } = useMoney();

  // Extract dates and amounts for income and expenses separately
//   const dates = money.map(item => item.createdAt);
//   const incomeData = money.filter(item => item.transactionType === 'income').map(item => item.transactionAmount);
//   const expenseData = money.filter(item => item.transactionType === 'expense').map(item => item.transactionAmount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: totalIncome,
        fill: true,
        borderColor: 'green',
        tension: 0.1
      },
      {
        label: 'Expense',
        data: totalExpense,
        fill: true,
        borderColor: 'red',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
          text: 'Amount'
        },
        beginAtZero: true
      }
    }
  };

  return <Line data={data} options={options} />;
};