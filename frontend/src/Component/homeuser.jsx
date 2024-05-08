import { useEffect, useState } from "react";
import NavScrollExample from "./nav";
import axios from "axios";

export default function Homeuser() {
    const [user, setUser] = useState({ username: "", email: "", blogs: [] });
    useEffect(() => {
        async function serverCall() {
            const response = await axios.get("http://localhost:6500/user/userdata", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            setUser(response.data);
        }
        serverCall();
    }, []);
    async function deleteblog(id) {
        try {
            const response = await axios.delete("http://localhost:6500/blog/deleteblog", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
                data: {
                    id: id
                }
            })
            const users = user.blogs.filter(items => items._id !== id)
            setUser({ ...user, blogs: users })
            console.log(response);
        }
        catch (error) {
            console.log("Error deleting blog:", error)

        }
    }
    return (
        <div>
            <NavScrollExample />

            <div id="outerdata">
                <div>
                    <h1>{localStorage.getItem("name")?.slice(0, 1)}</h1>
                </div>
                <div>
                    <h3>Username : {user.username}</h3>
                    <h3>Email : {user.email}</h3>
                    <h5>Blogs : {user.blogs.length}</h5>
                </div>
                {user.blogs && user.blogs.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th id="srno">Sr.No</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>



                        <tbody id="tbody">
                            {user.blogs.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={item.img} height={50}></img></td>
                                    <td>{item.title}</td>
                                    <td>{item.date.toString().slice(0, 10)}</td>
                                    <td><button onClick={() => { deleteblog(item._id) }}>Delete</button></td>
                                </tr>

                            ))}

                        </tbody>
                        </table>
                ) : (
                    <p>No Blogs Found</p>
                )}
            </div>
        </div>

    )
}