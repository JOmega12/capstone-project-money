
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

// import { Navbar } from "./Navbar"
// import { AuthProvider } from "./providers/AuthProvider"
// import { IncomeProvider } from "./providers/IncomeProvider"

function App() {
  // const [count, setCount] = useState(0)

  // bg-[#f4f4ec]
  // font-Montserrat
  return (
    <>
      <div className="flex justify-center flex-col items-center max-[768px]:px-2 lg:px-6 md:px-10
      min-[320px]:my-2 lg:my-2 md:my-2
      w-screen bg-[#fffcf6] space-y-5 min-h-screen font-montserrat">
        <AuthProvider>
          <IncomeAndExpenseProvider>
            <Routes>
              {/* <Route path="/" element={<WelcomeComponent />}></Route> */}
              <Route path="/income" element={<IncomeInputForm/>}></Route>
              <Route path="expense" element={<ExpenseInputForm/>}></Route>
              <Route path="/categories" element={<Categories/>}></Route>
              <Route path="/" element={<Dashboard />}></Route>
            </Routes>
          </IncomeAndExpenseProvider>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
