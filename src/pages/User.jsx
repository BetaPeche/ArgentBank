import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editUsername } from "../features/userSlice"
import userData from "../assets/userData.json"
import Transaction from "../components/Transaction"

const User = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState(user.userName)
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()
    const userTransaction = userData.find((u) => u.user === user.email)

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
                        <div className="user-edit-info">
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
            {userTransaction.accounts.map((account, index) => (
                <Transaction key={index} data={account} />
            ))}
        </main>
    ) : (
        <h1>Erreur</h1>
    )
}

export default User
