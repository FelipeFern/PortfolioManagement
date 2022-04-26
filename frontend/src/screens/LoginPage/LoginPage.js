import axios from "axios";
import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function LoginPage() {
    const navigate = useNavigate();

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [nameRegister, setNameRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [confirmpasswordRegister, setConfirmPasswordRegister] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [containerActive, setContainerActive] = useState("login_container ");
    const [errorLogin, setErrorLogin] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [messageLogin, setMessageLogin] = useState(null);
    const [messageRegister, setMessageRegister] = useState(null);
    const [errorRegister, setErrorRegister] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoadingLogin(true);
            const { data } = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    email: emailLogin,
                    password: passwordLogin,
                }
            );
            setLoadingLogin(false);
            setErrorLogin(true);
            localStorage.setItem("userId", JSON.stringify(data._id));
            navigate("/coins");
        } catch (error) {
            setErrorLogin(error.response.data.message);
            setLoadingLogin(false);
            setMessageLogin()
        }
    };

    /*
   );
                console.log(data);
                setLoadingRegister(false);
                localStorage.setItem("userId", JSON.stringify(data._id));
                setErrorRegister(false);
                setMessageRegister("User creates successfully");
                navigate("/coins");
            } catch (error) {
                setErrorRegister(error.response.data.message);
                setMessageRegister(false);
                setLoadingRegister(false);

    */

    const submitHandlerRegister = async (e) => {
        e.preventDefault();
        console.log(emailRegister);

        if (passwordRegister !== confirmpasswordRegister) {
            setMessageRegister("Passwords do not match");
        } else
            try {
                console.log("Trying to register a new user");
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                setLoadingRegister(true);
                const { data } = await axios.post(
                    "/api/users",
                    {
                        name: nameRegister,
                        email: emailRegister,
                        password: passwordRegister,
                    },
                    config
                );
                console.log(data);
                setLoadingRegister(false);
                localStorage.setItem("userId", JSON.stringify(data._id));
                setErrorRegister(false);
                setMessageRegister("User creates successfully");
                navigate("/coins");
            } catch (error) {
                setErrorRegister(error.response.data.message);
                setMessageRegister(false);
                setLoadingRegister(false);
            }
    };

    const showHidePassword = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    const signUpOnClick = (e) => {
        e.preventDefault();
        setContainerActive(
            containerActive === "login_container active"
                ? "login_container"
                : "login_container active"
        );
        return true;
    };

    return (
        <div className="main_containter_login">
            <div className={containerActive}>
                <div className="forms">
                    <div className="form login">
                        <div className="title_container">
                            <span className="title">Welcome </span>
                        </div>
                        <div className="message_span">
                            {errorLogin && (
                                <ErrorMessage variant="danger">
                                    {errorLogin}
                                </ErrorMessage>
                            )}
                            {messageLogin && (
                                <ErrorMessage variant="success">
                                    {messageLogin}
                                </ErrorMessage>
                            )}
                            {loadingLogin && <Loading />}
                        </div>

                        <form
                            className="login_form"
                            action="#"
                            onSubmit={submitHandler}
                        >
                            <div className="input_field">
                                <div className="logo">
                                    {" "}
                                    <HiOutlineMail />{" "}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) =>
                                        setEmailLogin(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setPasswordLogin(e.target.value)
                                    }
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
                                <input type="submit" value="LOGIN" required />
                            </div>
                        </form>

                        <div className="login-signup">
                            <span type="text">
                                {" "}
                                Don't have an account?
                                <a onClick={(e) => signUpOnClick(e)}>
                                    {" "}
                                    Sign Up
                                </a>
                            </span>
                        </div>
                    </div>
                    {/* Registration Form */}

                    <div className="form register">
                        <div className="title_container">
                            <span className="title">Welcome </span>
                        </div>
                        <div className="message_span">
                            {errorRegister && (
                                <ErrorMessage variant="danger">
                                    {errorRegister}
                                </ErrorMessage>
                            )}
                            {messageRegister && (
                                <ErrorMessage variant="success">
                                    {messageRegister}
                                </ErrorMessage>
                            )}
                            {loadingRegister && <Loading />}
                        </div>
                        
                        <form
                            className="login_form"
                            action="#"
                            onSubmit={submitHandlerRegister}
                        >
                            <div className="input_field">
                                <div className="logo">
                                    {" "}
                                    <AiOutlineUser />{" "}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your User Name"
                                    onChange={(e) =>
                                        setNameRegister(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setEmailRegister(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setPasswordRegister(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setConfirmPasswordRegister(
                                            e.target.value
                                        )
                                    }
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
                                    type="submit"
                                    value="REGISTER"
                                    required
                                />
                            </div>
                        </form>

                        <div className="login-signup">
                            <span type="text">
                                {" "}
                                Already have an account?
                                <a onClick={(e) => signUpOnClick(e)}> Login</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
