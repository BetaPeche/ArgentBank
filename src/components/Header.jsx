import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logOut } from "../features/userSlice"

const Header = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = (event) => {
        event.preventDefault()
        dispatch(logOut())
        navigate("/")
    }

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo.webp"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {user.isConnected ? (
                    <>
                        <Link to="/profile" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            &nbsp;{user.userName}&nbsp;
                        </Link>
                        <a
                            href="/"
                            className="main-nav-item"
                            onClick={handleSignOut}
                        >
                            <i className="fa fa-sign-out"></i>
                            &nbsp;Sign Out
                        </a>
                    </>
                ) : (
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        &nbsp;Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Header
