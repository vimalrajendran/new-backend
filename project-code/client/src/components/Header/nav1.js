import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import { useNavigate} from "react-router-dom";

export default function Nav1() {
    const firstname = localStorage.getItem("firstname");
    const lastname = localStorage.getItem("lastname");
    const name = firstname +" "+ lastname;
    let navigate = useNavigate();
    const user = localStorage.getItem("token");
    console.log(user)
    const logOut = () => {
        localStorage.clear();
        navigate(0)
    }

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant='dark'>
                <Container fluid>
                    <Navbar.Brand href="#" style={{ 'marginTop': "10px" }}> <FastfoodIcon style={{ 'marginBottom': "10px" }} /> Nutrition Plus</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        {
                            !user ? <div><Button className='ms-2' variant='secondary' onClick={() => navigate('/Signin')}><LoginSharpIcon /> Login</Button>
                                <Button className='ms-2' variant='secondary' onClick={() => navigate('/signup')}><PersonAddSharpIcon /> Register</Button></div>
                                :
                                <div>
                                    
                                <NavDropdown className="mx-5"
                                    id="nav-dropdown-dark-example"
                                    title={name}
                                    menuVariant="dark"
                                > 
                                    <NavDropdown.Item href="#action/3.1" onClick={ ()=>navigate('/profile')}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Favourites 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3" onClick={logOut}>LogOut</NavDropdown.Item>
                                </NavDropdown>
                                </div>

                        }

                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </div>
    )
}
