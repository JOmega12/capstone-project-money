
// import './App.css'

import { Route, Routes } from "react-router"
import { WelcomeComponent } from "./components/WelcomeComponent"
// import { Login } from "./components/forms/Login"
import { AuthProvider } from "./providers/AuthProvider"
import { IncomeAndExpenseProvider } from "./providers/IncomeAndExpenseProvider"
import { Dashboard } from "./components/dashboard/Dashboard"
import { IncomeInputForm } from "./components/forms/IncomeInputForm"
import { ExpenseInputForm } from "./components/forms/ExpenseInputForm"
import { Categories } from "./components/Categories"
import { IncomeDash } from "./components/IncomeAndExpense/IncomeDash"
import { ExpenseDash } from "./components/IncomeAndExpense/ExpenseDash"
import { TestComponent } from "./components/TestComponent"

// import { Navbar } from "./Navbar"
// import { AuthProvider } from "./providers/AuthProvider"
// import { IncomeProvider } from "./providers/IncomeProvider"

function App() {
  // const [count, setCount] = useState(0)

  // bg-[#f4f4ec]
  // font-Montserrat
  return (
    <>
      <div className="flex justify-center flex-col items-center
      w-screen bg-[#fffcf6] space-y-5 min-h-screen font-montserrat">
        <AuthProvider>
          <IncomeAndExpenseProvider>
            <Routes>
              <Route path="/" element={<WelcomeComponent />}></Route>
              <Route path="/income" element={<IncomeDash/>}></Route>
              <Route path="/add-income" element={<IncomeInputForm/>}></Route>
              <Route path="expense" element={<ExpenseDash/>}></Route>
              <Route path="/add-expense" element={<ExpenseInputForm/>}></Route>
              <Route path="/categories" element={<Categories/>}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/test-server" element={<TestComponent/>}></Route>
            </Routes>
          </IncomeAndExpenseProvider>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
