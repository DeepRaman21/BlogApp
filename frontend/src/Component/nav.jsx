import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css"

function NavScrollExample() {
  return (
    <Navbar className='sticky'>
      <Container fluid id='navbar'>
        <Navbar.Brand href="/home">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll d-flex" className='justify-content-end'>
          <Nav>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
            <Nav.Link style={{backgroundColor:"black", color:"aliceblue",borderRadius:"8px"}} href="/add">Add Blog</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;


<Navbar>
      <Container fluid>
        <Navbar.Brand href="/">LOGO</Navbar.Brand>
        <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Signup">Signup</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="">Logout</Nav.Link>
            <Button>Add Blog</Button>
        </Nav>
          
      </Container>
    </Navbar>