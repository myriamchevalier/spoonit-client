import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./Nav.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to="/">Randomizer</Link>
            </li>
            <li className="navbar__item">
             <Link className="nav-link" to="/tasks">Tasks</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/tips">Tips</Link>
            </li>
            {
                (localStorage.getItem("si_token") !== null) ?
                    <li className="navbar__item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("si_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }   
        </ul>    
    )
}
