// import { Link } from "react-router-dom"
// import FontAwesome

import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Navbar = () => {
    return(
        <div className="Navbar">
            <div className="flex gap-1">
                <FontAwesomeIcon icon={faBars}/>
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