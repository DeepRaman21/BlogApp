import { useNavigate } from "react-router-dom";
import "./main.css"
export default function Blog({ title, description, image, date, author }) {
    const navigate = useNavigate();
    const dateTime = date.toString();
    const dates = dateTime.slice(0, 10);
    function handleClick() {
        navigate("/view", { state: { product: { title, description, image, dates, author } } })
    }

    return (<center>
        <div onClick={handleClick} className="blogjsx">
            <div id="blogjsx1">

                <div id="author1">
                    <p id="author">{author?.slice(0, 1)}</p>
                    <p>{dates}</p>
                <h2>{title}</h2>
                <p id="desc">{description?.slice(0, 100) + "..."}</p>
                </div>
            </div>
        </div>
    </center>
    );
}