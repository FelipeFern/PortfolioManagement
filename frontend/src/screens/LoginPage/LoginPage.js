import axios from "axios";
import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { UserContext } from "../../UserContext";
import { AiOutlineUser, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";

function LoginPage() {
    
    let booleanVar = false;
    const { user, setUser } = useContext(UserContext);

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [loginActive, setLoginActive] = useState("form login ");
    const [registerActive, setRegisterActive] = useState("form register ");
    const [containerActive, setContainerActive] = useState("login_container ");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("Estoy queriendo hacer el LogIn");
            const name = "nombre pruebas";
            const { data } = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    emailLogin,
                    passwordLogin,
                }
            );
            setUser(data);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    const showHidePassword = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    const signUpOnClick = (e) => {
        e.preventDefault()
        console.log(containerActive)
        setContainerActive(
            containerActive === "login_container active"
                    ? "login_container"
                    : "login_container active"
            );
       
            // setLoginActive(
            //     loginActive === "form login active"
            //         ? "form login unactive"
            //         : "form login active"
            // );
            // setRegisterActive(
            //     registerActive === "form register active"
            //         ? "form register unactive"
            //         : "form register active"
            // );
        console.log(containerActive)
        return true;
        
        
    };

    return (
        <div className="main_containter_login">
            <div className={containerActive}>
                <div className="forms">
                    <div className={loginActive}>
                        <div className="title_container">
                            <span className="title">Welcome </span>
                        </div>
                        <form className="login_form" action="#">
                            <div className="input_field">
                                <div className="logo">
                                    {" "}
                                    <HiOutlineMail />{" "}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    required
                                ></input>
                            </div>
                            <div className="input_field">
                                <div className="logo">
                                    {" "}
                                    <RiLockPasswordLine />{" "}
                                </div>
                                <input
                                    type={passwordType}
                                    placeholder="Password"
                                    className="password"
                                    required
                                ></input>
                                <div
                                    className="logo eye_slash"
                                    onClick={() => showHidePassword()}
                                >
                                    {" "}
                                    <AiOutlineEyeInvisible />
                                </div>
                            </div>

                            <div className="button-input">
                                <input type="button" value="LOGIN" required />
                            </div>
                        </form>

                        <div className="login-signup">
                            <span class="text">
                                {" "}
                                Don’t have an account?
                                <a onClick ={(e) => signUpOnClick(e)}> Sign Up</a>
                            </span>
                        </div>
                    </div>
                    {/* Registration Form */}

                    <div className={registerActive}>
                        <div className="title_container">
                            <span className="title">Welcome </span>
                        </div>
                        <form className="login_form" action="#">
                            <div className="input_field">
                                <div className="logo">
                                    {" "}
                                    <AiOutlineUser />{" "}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your User Name"
                                    required
                                ></input>
                            </div>
                            <div className="input_field">
                                <div className="logo">
                                    {" "}
                                    <HiOutlineMail />{" "}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your Email"
                                    required
                                ></input>
                            </div>
                            <div className="input_field">
                                <div className="logo">
                                    {" "}
                                    <RiLockPasswordLine />{" "}
                                </div>
                                <input
                                    type={passwordType}
                                    className="password"
                                    placeholder="Create a Password"
                                    required
                                ></input>
                                <div
                                    className="logo eye_slash"
                                    onClick={() => showHidePassword()}
                                >
                                    {" "}
                                    <AiOutlineEyeInvisible />
                                </div>
                            </div>
                            <div className="input_field">
                                <div className="logo">
                                    {" "}
                                    <RiLockPasswordLine />{" "}
                                </div>
                                <input
                                    type={passwordType}
                                    placeholder="Confirm Password"
                                    className="password"
                                    required
                                ></input>
                                <div
                                    className="logo eye_slash"
                                    onClick={() => showHidePassword()}
                                >
                                    {" "}
                                    <AiOutlineEyeInvisible />
                                </div>
                            </div>

                            <div className="button-input">
                                <input
                                    type="button"
                                    value="REGISTER"
                                    required
                                />
                            </div>
                        </form>

                        <div className="login-signup">
                            <span class="text">
                                {" "}
                                Already have an account?
                                <a onClick ={(e) => signUpOnClick(e)}> Login</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <MainScreen title="LOGIN">
        //     <div className="loginContainer">
        //         {error && (
        //             <ErrorMessage variant="danger"> {error}</ErrorMessage>
        //         )}
        //         {loading && <Loading />}
        //         <Form onSubmit={submitHandler}>
        //             <Form.Group controlId="formBasicEmail">
        //                 <Form.Label>Email address</Form.Label>
        //                 <Form.Control
        //                     type="email"
        //                     placeholder="Enter email"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                 />
        //             </Form.Group>

        //             <Form.Group controlId="formBasicPassword">
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control
        //                     type="password"
        //                     placeholder="Password"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                 />
        //             </Form.Group>

        //             <Button variant="primary" type="submit">
        //                 Submit
        //             </Button>
        //         </Form>

        //         <Row className="py-3">
        //             <Col>
        //                 New Account:{" "}
        //                 <Link to="/register"> Register Here</Link>
        //             </Col>
        //         </Row>
        //     </div>
        // </MainScreen>
    );
}

export default LoginPage;
