import React from "react";
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
//import { useNavigate } from "react-router-dom";

const Header = () => {
     //const history = useNavigate();

    return (
        <div>
            <Navbar bg="secondary" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Portfolio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="m-auto">
                            <Form inline="true">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                            </Form>
                        </Nav>
                        <Nav
                            className=" my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link href="/InitialPage">
                                Initial Page
                            </Nav.Link>
                            <NavDropdown
                                title="User Name"
                                id="navbarScrollingDropdown"
                            >
                                <NavDropdown.Item href="#action3">
                                    My Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={()=> {
                                    localStorage.removeItem("userInfo");
                                    //history.push("/")
                                }}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
