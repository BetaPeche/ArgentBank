const FeatureItem = ({ data }) => {
    return (
        <div className="feature-item">
            <img
                src={data.image}
                alt={data.attribute}
                className="feature-icon"
            />
            <h3 className="feature-item-title">{data.title}</h3>
            <p>{data.description}</p>
        </div>
    )
}

export default FeatureItem
