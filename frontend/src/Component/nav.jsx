import { PiGitlabLogoFill } from "react-icons/pi";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NavScrollExample() {
  const navigate = useNavigate();
  const [login,setLogin] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setLogin(!login)
    }
  },[])
  const username = localStorage.getItem("name")?.slice(0,1)
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem('name')
    navigate("/login");
  }
  
  return (
    <Navbar className='sticky'>
      <Container fluid id='navbar'>
        <b><Navbar.Brand href="/" className="logo">BLOGGER</Navbar.Brand></b>
        <PiGitlabLogoFill id="icon" />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll d-flex" className='justify-content-end'>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            {
              login?
              <Nav.Link onClick={logout}>Logout</Nav.Link>:
              null
            }
            <Nav.Link style={{backgroundColor:"black", color:"aliceblue",borderRadius:"8px"}} href="/add">Add Blog</Nav.Link>
            
            {
              login?
              <Nav.Link href="" className='user'>{username}</Nav.Link>:
              null
            }
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;