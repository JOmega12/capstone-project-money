
import { Route, Routes } from "react-router"
import { WelcomeComponent } from "./components/WelcomeComponent"
import { AuthProvider } from "./providers/AuthProvider"
import { IncomeAndExpenseProvider } from "./providers/IncomeAndExpenseProvider"
import { Dashboard } from "./components/dashboard/Dashboard"
import { IncomeInputForm } from "./components/forms/IncomeInputForm"
import { ExpenseInputForm } from "./components/forms/ExpenseInputForm"
import { Categories } from "./components/categories/Categories"
import { IncomeDash } from "./components/IncomeAndExpense/IncomeDash"
import { ExpenseDash } from "./components/IncomeAndExpense/ExpenseDash"
// import { TestComponent } from "./components/testFolder/TestComponent"
import { CategoriesProvider } from "./providers/CategoriesProvider"
import { CreateCategory } from "./components/categories/CreateCategory"
import { CategoryDashboard } from "./components/categories/CategoryDashboard"


function App() {
  // bg-[#f4f4ec]
  // font-Montserrat
  return (
    <>
      <div className="flex justify-center flex-col items-center
      w-screen bg-[#fffcf6] space-y-5 min-h-screen font-montserrat">
        <AuthProvider>
          <IncomeAndExpenseProvider>
            <CategoriesProvider>
            <Routes>
              <Route path="/" element={<WelcomeComponent />}></Route>
              <Route path="/income" element={<IncomeDash/>}></Route>
              <Route path="/add-income" element={<IncomeInputForm/>}></Route>
              <Route path="expense" element={<ExpenseDash/>}></Route>
              <Route path="/add-expense" element={<ExpenseInputForm/>}></Route>
              
              <Route path="/create-category" element={<CreateCategory/>}></Route>
              <Route path="/categories" element={<Categories/>}></Route>
              <Route path="/category/:categoryId" element={<CategoryDashboard/>}></Route>

              <Route path="/dashboard" element={<Dashboard />}></Route>
              {/* Test Routes in the bottom */}
              {/* <Route path="/test-server" element={<TestComponent/>}></Route> */}
            </Routes>
            </CategoriesProvider>
          </IncomeAndExpenseProvider>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
