import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Component/home";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import AddBlog from "./Component/Addblog";
import ViewBlog from "./Component/ViewBlog";
import Email from "./Component/Forgot/email";
import Otp from "./Component/Forgot/otp";
import Reset from "./Component/Forgot/resetpass";
import Homeuser from "./Component/homeuser";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/add" element={<AddBlog/>}></Route>
        <Route path="/view" element={<ViewBlog />} />
        <Route path="/email" element={<Email />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/homeuser" element={<Homeuser/>} />

      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;

