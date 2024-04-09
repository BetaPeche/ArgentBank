import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editUsername } from "../features/userSlice"

const User = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState(user.userName)
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.isConnected) {
            navigate("/login")
        }
    })

    const handleEdit = () => {
        setIsEdit(!isEdit)
        if (isEdit) {
            setUsername(user.userName)
        }
    }

    const handleSubmit = async () => {
        dispatch(editUsername(username))
        try {
            await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    userName: username,
                }),
            })
        } catch (err) {
            console.error(err.message)
        }
        setIsEdit(false)
    }

    return user.isConnected ? (
        <main className="main bg-dark">
            <div className="header">
                {!isEdit ? (
                    <h1>
                        Welcome back
                        <br />
                        {`${user.firstName} ${user.lastName}!`}
                    </h1>
                ) : (
                    <>
                        <h1>Edit user info</h1>
                        <div>
                            <div>
                                <label htmlFor="username">User name: </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="firstname">First name: </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    disabled
                                    value={user.firstName}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname">Last name: </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    disabled
                                    value={user.lastName}
                                />
                            </div>
                        </div>
                        <button className="edit-button" onClick={handleSubmit}>
                            Save
                        </button>
                    </>
                )}
                <button className="edit-button" onClick={handleEdit}>
                    {isEdit ? "Cancel" : "Edit Name"}
                </button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Checking (x8349)
                    </h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Savings (x6712)
                    </h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Credit Card (x8349)
                    </h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">
                        Current Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
        </main>
    ) : (
        <h1>Erreur</h1>
    )
}

export default User
