import { useLocation } from "react-router-dom"
import NavScrollExample from "./nav";
import "./ViewBlog.css";
export default function ViewBlog(){
    const location = useLocation();
    const product = location.state?.product;
    console.log(product.image)
    return<>
    <NavScrollExample />
    <center>
    <div>
        <h1 id="vtitle">{product.title}</h1>
        <img id="img" src={product.image}alt="" />
        <p id="vp">{product.description}</p>
    </div>
    </center>
    </>
}