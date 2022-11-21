import "./not-found-style.css";

export default function NotFound({ title, message }) {
    return (
        <div className="ghost__container">
            <p className="text">{title || 404}</p>
            <div className="ghost__body">
                <div className="ghost__eye">
                    <div className="ghost__eye__ball"></div>
                </div>
                <div className="ghost__cheeks"></div>
                <div className="ghost__bottom b1"></div>
                <div className="ghost__bottom b2"></div>
                <div className="ghost__bottom b3"></div>
                <div className="ghost__bottom b4"></div>
            </div>
            <div className="shadow"></div>
            <p className="text" style={{ position: "relative", top: "50px" }}>
                {message || "Not found"}
            </p>
        </div>
    );
}
