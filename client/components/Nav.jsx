import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
const Nav = () => {
    const router = useRouter();
    const [state, setState] = useContext(UserContext);
    const [current, setCurrent] = useState("");
    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);
    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    }
    return (
        <div>
            <nav class="navbar navbar-light bg-light justify-content-end">
            <Link href="/">
                <a className={`nav-link text-dark ${current === "/" && "active"}`} aria-current="page">Home</a>
            </Link>
            <Link href="/events">
                <a className={`nav-link text-dark ${current === "/events" && "active"}`} aria-current="page">Events</a>
            </Link>
            <Link href="/shop">
                <a className={`nav-link text-dark ${current === "/shop" && "active"}`} aria-current="page">Shop</a>
            </Link>
            <Link href="/results">
                <a className={`nav-link text-dark ${current === "/results" && "active"}`} aria-current="page">Results</a>
            </Link>
            <Link href="/uploadResults">
                <a className={`nav-link text-dark ${current === "/uploadResults" && "active"}`} aria-current="page">Upload Results</a>
            </Link>
            <Link href="/about">
                <a className={`nav-link text-dark ${current === "/about" && "active"}`} aria-current="page">About</a>
            </Link>
            <Link href="/contact">
                <a className={`nav-link text-dark ${current === "/contact" && "active"}`} aria-current="page">Contact Us</a>
            </Link>
            {state !== null ? (
            <>
            <Link href="/user/dashboard">
                <a className={`nav-link text-dark ${current === "/user/dashboard" && "active"}`}>{state && state.user && state.user.name}</a>
            </Link>
            <a onClick={logout} className="nav-link">Logout</a>
            </>
            ):(
                <>
                    <Link href="/register">
                        <a className={`nav-link text-dark ${current === "/register" && "active"}`}>Register</a>
                    </Link>
                    <Link href="/login">
                        <a className={`nav-link text-dark ${current === "/login" && "active"}`}>Login</a>
                    </Link>
                </>
            )
            }
            </nav>
        </div>
    )
}

export default Nav
