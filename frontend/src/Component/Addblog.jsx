import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavScrollExample from "./nav";
import "./main.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:6500/";

export default function AddBlog() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
  }, [])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFileName] = useState(null);
  const [spinner, setSpinner] = useState(false);



  const handlePost = async (e) => {  // Corrected access to event target value
    console.log(title)
    console.log(description)
    e.preventDefault();
    const formData = new FormData();
    setSpinner(true)
    formData.append('title', title);
    formData.append('description', description);
    formData.append('filename', filename);
    console.log(formData);
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post("/blog/create", formData, {
        headers: {
          Authorization: token
        }
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <>
      <NavScrollExample />
      <center>
        <div className="outer"><br />
          <form style={{ width: "100%" }} >
            <h1>Add a new Blog</h1>
            <LabelledInput
              type="text"
              placeholder="&nbsp; Title"
              name="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <h4>Description</h4>
            <textarea
            type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="&nbsp; Description"
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
            {
              spinner ?
                <button onClick={(e) => handlePost(e)} type="submit" id="post" disabled>
                  Loading...
                </button> :
                <button onClick={(e) => handlePost(e)} type="submit" id="post">
                  POST
                </button>
            }

            <br /><br />

          </form>
        </div>
      </center>
    </>
  );
}

function LabelledInput({ type, placeholder, name, value, onChange }) {
  return (
    <>
      <h4>{name}</h4>
      <input
        className="inputblog"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}