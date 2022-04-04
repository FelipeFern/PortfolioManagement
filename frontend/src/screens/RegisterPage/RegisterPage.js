import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterPage.css";
//import { dispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../components/Loading";

const RegisterPage = ({ history }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // const dispatch = useDispatch();

    // const userRegister = useSelector((state) => state.userRegister);
    // const { loading, error, userInfo } = userRegister;

    //  useEffect(() => {
    //     if (userInfo) {
    //         history.push("/");
    //     }
    // }, [history, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email);

        if (password !== confirmpassword) {
            setMessage("Passwords do not match");
        } else
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                setLoading(true);
                const { data } = await axios.post(
                    "/api/users",
                    { name, email, password },
                    config
                );
                console.log(data);
                setLoading(false);
                localStorage.setItem("userInfo", JSON.stringify(data));
                setError(false);
                setMessage("User creates successfully");
            } catch (error) {
                setError(error.response.data.message);
                setMessage(false);
                setLoading(false);
            }

        //dispatch(register(name, email, password,));
    };

    return (
        <MainScreen title="REGISTER">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && (
                    <ErrorMessage variant="success">{message}</ErrorMessage>
                )}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
};

export default RegisterPage;
