// import { Link } from "react-router-dom"


export const Navbar = () => {
    return(
        <div className="Navbar">
            <div>
                <div>Hamburger</div>
                <div>Logo</div>
            </div>
            <div>
                <h2>Hello name!</h2>
                <nav>
                    {/* <Link></Link> */}
                    <button>Dashboard</button>
                    <button>Income</button>
                    <button>Expenses</button>
                    <button>Categories</button>
                </nav>
                <div>
                    <button>Sign Out</button>
                </div>
            </div>
        </div>
    )
}