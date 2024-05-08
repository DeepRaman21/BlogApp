import { useState, useEffect } from "react";
import NavScrollExample from "./nav";
import axios from "axios";
import Blog from "./Blog";

axios.defaults.baseURL = "http://localhost:6500/";

export default function Home() {

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    async function serverCall() {
      const response = await axios.get("blog/allblogs")
      console.log(response)
      setBlog(response.data.blog)
    }
    serverCall();
  }, [])
  return (
    <>
      <NavScrollExample />

      <div >

        {
          blog.map((item, index) => (
            <div key={index}>
              <Blog author={item.authorName} title={item.title} description={item.description} image={item.img} date={item.date} />
            </div>
          ))
        }

      </div>
    </>
  )
}
