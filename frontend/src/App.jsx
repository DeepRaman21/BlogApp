import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Component/home";
import NavScrollExample from "./Component/nav";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import AddBlog from "./Component/Addblog";
import ViewBlog from "./Component/ViewBlog";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <NavScrollExample/> */}
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/add" element={<AddBlog/>}></Route>
        <Route path="/view" element={<ViewBlog />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

