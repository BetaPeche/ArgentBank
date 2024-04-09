import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUserProfile, logIn } from "../features/userSlice"
import { useDispatch } from "react-redux"

const Signin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user"))
        if (localUser) {
            setEmail(localUser.localEmail)
            setPassword(localUser.localPassword)
            setIsChecked(true)
        }
    }, [])

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!email || !password) {
            setError("Veuillez remplir tous les champs")
        } else {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/v1/user/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    }
                )
                const res = await response.json()

                if (res.status === 200) {
                    dispatch(logIn(res.body.token))
                    const response2 = await fetch(
                        "http://localhost:3001/api/v1/user/profile",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${res.body.token}`,
                            },
                        }
                    )
                    const res2 = await response2.json()
                    dispatch(fetchUserProfile(res2.body))
                    const userInfo = {
                        localEmail: email,
                        localPassword: password,
                    }
                    if (isChecked) {
                        localStorage.setItem("user", JSON.stringify(userInfo))
                    } else {
                        localStorage.clear()
                    }
                    navigate("/profile")
                }
                if (res.status === 400) {
                    setError("Mauvaise combinaison email/mot de passe")
                }
            } catch (err) {
                setError(err.message)
            }
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={isChecked}
                            onChange={checkHandler}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {error && <span className="form-error">{error}</span>}
                    <button className="sign-in-button" type="submit">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Signin
