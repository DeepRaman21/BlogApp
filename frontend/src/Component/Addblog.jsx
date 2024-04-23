// import React, { useState } from "react";
// import { useNavigate} from "react-router-dom";
// import NavScrollExample from "./nav";
// import "./main.css"
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:6500/";

// export default function AddBlog(){
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [filename, setFileName] = useState("");
//     const navigate = useNavigate();

//     const handlePost = async () => {
//         if (validateForm()) {
//           try {
//             const response = await axios.post("/blog/create", { title,description,filename });
//             const result = response.data;
//             localStorage.setItem("blog", JSON.stringify(result));
//               navigate("/home");
//           } catch (error) {
//             console.error("Error:", error);
//           }
//         }
//       };
//     return(
//         <>
//         <NavScrollExample />
//         <div>
//             <form action="">
//                 <center>
//                 <LabelledInput type="text" placeholder="Title" name="Name" /><br/><br/>
//                 <textarea id="Desc" typeof="text" placeholder="Description" ></textarea><br/>
//                 <LabelledInput type="file" placeholder="Insert Image" name="Image"/><br/><br/>
//                 <button onClick={handlePost}  id="post">POST</button>
//                 </center>
//             </form>
//         </div>
//         </>
//     )
// }

// function LabelledInput({type,placeholder,name}){
//     return(
//         <label >
//             <h1>{name}</h1>
//             <input id="input" type={type} placeholder={placeholder} />
//         </label>
//     )

// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavScrollExample from "./nav";
import "./main.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:6500/";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFileName] = useState(null);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    console.log(title)
    console.log(description)
    e.preventDefault()
        const formData = new FormData();
        formData.append('title',title );
        formData.append('description',description);
        formData.append('filename',filename);
        console.log(formData);
        try {
        const response = await axios.post("/blog/create",formData);
        navigate("/home");
      } catch (error) {
        console.error("Error:", error);
      }
  };

  

  return (
    <>
      <NavScrollExample />
      <center>
      <div className="outer"><br/>
        <form >
          
            <LabelledInput
              type="text"
              placeholder="Title"
              name="Name"
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <h2>Description</h2>
            <textarea id="Desc"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              name="Description"
              
            />
            <br />
            <LabelledInput
              type="file"
              placeholder="Insert Image"
              name="Image"
              onChange={(e) => setFileName(e.target.files[0])}
            />
            <br />
            <br />
            <button onClick={(e)=>handlePost(e)} type="submit" id="post">
              POST
            </button><br/><br/>
          
        </form>
      </div>
      </center>
    </>
  );
}

function LabelledInput({ type, placeholder, name, value, onChange }) {
  return (
    <label>
      <h2>{name}</h2>
      <input
        id="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
