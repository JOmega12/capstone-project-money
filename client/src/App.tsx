
// import './App.css'

import { Route, Routes } from "react-router"
import { WelcomeComponent } from "./components/WelcomeComponent"
// import { Login } from "./components/forms/Login"
import { AuthProvider } from "./providers/AuthProvider"
import { IncomeAndExpenseProvider } from "./providers/IncomeAndExpenseProvider"

// import { Navbar } from "./Navbar"
// import { AuthProvider } from "./providers/AuthProvider"
// import { IncomeProvider } from "./providers/IncomeProvider"

function App() {
  // const [count, setCount] = useState(0)

  // bg-[#f4f4ec]
  return (
    <>
      <div className="flex justify-center flex-col items-center lg:p-20 md:p-10 w-screen bg-[#fffcf6] space-y-5 min-h-screen ">
        <AuthProvider>
          <IncomeAndExpenseProvider>
            <Routes>
              <Route path="/" element={<WelcomeComponent />}></Route>
            </Routes>
          </IncomeAndExpenseProvider>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
