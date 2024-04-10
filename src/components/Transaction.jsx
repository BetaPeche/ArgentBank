const Transaction = ({ data }) => {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{`Argent Bank ${data.accountType} (${data.accountNumber})`}</h3>
                <p className="account-amount">{data.balance}</p>
                <p className="account-amount-description">
                    {data.balanceDescription}
                </p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">
                    View transactions
                </button>
            </div>
        </section>
    )
}

export default Transaction
