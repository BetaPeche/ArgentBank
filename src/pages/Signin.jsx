import { useNavigate } from "react-router-dom"

const Signin = () => {
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = document.getElementById("username").value
        const password = document.getElementById("password").value

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
                console.log(res.body.token)
                navigate("/user")
            }
            if (res.status === 400) {
                console.log("Erreur")
            }
        } catch (err) {
            // console.error(err.message)
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {/* <a href="./user.html" className="sign-in-button">
                        Sign In
                    </a> */}
                    <button className="sign-in-button" onClick={handleSubmit}>
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Signin
