import { useNavigate } from "react-router-dom";
import "./main.css"
export default function Blog ({title,description,image}) {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/view", {state: {product: {title,description,image}}})
    }
    return(
        <center>
        <div onClick={handleClick} className="blogjsx">
            <div>
            <h2 >{title}</h2>
            <p id="desc">{description.slice(0,100) + "..."}</p>
          </div>
        </div>
        </center>
    );
}