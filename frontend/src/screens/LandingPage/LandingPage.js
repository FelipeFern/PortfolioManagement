import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");
    //     if (userInfo) {
    //         history.push("/coins");
    //     }
    // }, [history]);

    return (
        <div className=" main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title"> Welcome</h1>
                            <p className="subtitle">
                                One place for all your coins
                            </p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/login">
                                <Button size='lg' className="landigbutton" variant="outline-primary">Login</Button>
                            </a>
                            <a href="/register">
                                <Button size='lg' className="landigbutton" variant="outline-primary">Signup</Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;
