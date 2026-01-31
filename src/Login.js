import { useState } from "react";
import { authenticateUser } from "./api/Api";
import { authState } from "./config";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loginType, setLoginType] = useState("user");
    const [loginError, setLoginError] = useState("");
    const [loginColor, setLoginColor] = useState("red");

    const openRegister = () => {
        document.getElementById("loginpage").style.display = "none";
        document.getElementById("registerpage").style.display = "block";
    };

    const closeLogin = () => {
        document.getElementById("loginpage").style.display = "none";
        setUserName("");
        setPassword("");
        setLoginError("");
        setLoginColor("red");
    };

    const authenticate = async () => {
        try {
            const info = await authenticateUser(userName, password, loginType);
            window.userSession = info;

            setLoginColor("red");
            if (info.status === "success") {
                setLoginColor("green");
                setLoginError("Login Successfully ....");
                authState.isLoggedIn = true;
                setTimeout(() => {
                    setLoginError("Redirecting....");
                }, 1000);

                setTimeout(() => {
                    if (loginType) {
                        window.location.href = info.url;
                    }
                    closeLogin();
                }, 3000);
            } else if (info.status === "failure") {
                setLoginError(info.statusMessage);
            } else if (info.status === "emailempty") {
                setLoginError("Please enter email...");
            } else if (info.status === "passempty") {
                setLoginError("Please enter pass...");
            } else if (info.status === "username") {
                setLoginError("Invalid username..!!!");
            } else if (info.status === "password") {
                setLoginError("Wrong password..!!!");
            } else {
                setLoginError("Something went wrong..!!!");
            }
        } catch (error) {
            setLoginError("Error connecting to server");
        }
    };

    return (
        <>
        <style>
        {`
        
        `}            
        </style>
        <div className="login" id="loginpage">
            <div className="form-container">
                <div className="close">
                    <label htmlFor="close">
                        <button onClick={closeLogin}>X</button>
                    </label>
                </div>
                <form id="loginform" onSubmit={(e) => e.preventDefault()}>
                    <table align="center" id="login">
                        <tbody>
                            <tr>
                                <th colSpan="2">
                                    <label htmlFor="heading">Login</label>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="hidden" value="login" name="action" />
                                </td>
                            </tr>
                            <tr>
                                <td className="loginType">
                                    <label htmlFor="users">
                                        <input
                                            type="radio"
                                            id="users"
                                            name="loginType"
                                            value="user"
                                            checked={loginType === "user"}
                                            onChange={(e) => setLoginType(e.target.value)}
                                        />
                                        <div>User</div>
                                    </label>
                                </td>
                                <td className="loginType">
                                    <label htmlFor="admin">
                                        <input
                                            type="radio"
                                            id="admin"
                                            name="loginType"
                                            value="admin"
                                            checked={loginType === "admin"}
                                            onChange={(e) => setLoginType(e.target.value)}
                                        />
                                        <div>Admin</div>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="username">Username</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="email or username"
                                        id="username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="password">Password</label>
                                </td>
                                <td>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <label htmlFor="login">
                                        <input
                                            type="button"
                                            value="login"
                                            id="loginBtn"
                                            onClick={authenticate}
                                        />
                                    </label>
                                </th>
                            </tr>
                            <tr>
                                <td colSpan="2" id="logerr">
                                    <label
                                        htmlFor="error"
                                        id="loginError"
                                        style={{ color: loginColor }}
                                    >
                                        {loginError}
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <i>Don't have an Account ?</i>
                                    <label htmlFor="login">
                                        <br />
                                        <input
                                            type="button"
                                            value="Register Here"
                                            onClick={openRegister}
                                        />
                                    </label>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
        </>
    );
}