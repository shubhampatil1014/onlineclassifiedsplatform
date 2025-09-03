export default function () {
    const openRegister= function(){
        document.getElementById("loginpage").style.display = "none";
		document.getElementById("registerpage").style.display = "block";
    }
    const authenticate=function(){

    }
    const closeLogin=function(){
        document.getElementById("loginpage").style.display="none";
    }
    return (
        <div className="login" id="loginpage">
            <div className="form-container">
                <div className="close">
                    <label htmlFor="close"><button onClick={() => closeLogin()}>X</button></label>
                </div>
                <form id="loginform" >
                    <table align="center" id="login">
                        <tbody>
                        <tr>
                            <th colSpan="2"><label htmlFor="heading">Login</label></th>
                        </tr>
                        <tr><td><input type='hidden' value='login' name="action" /></td></tr>
                        <tr>
                            <td className="loginType">
                                <label htmlFor="users"><input type="radio" id="users" name="loginType" value="user" defaultChecked /><div>User</div></label>
                            </td>
                            <td className="loginType">
                                <label htmlFor="admin"><input type="radio" id="admin" name="loginType" value="admin" /><div>Admin</div></label>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="username">Username</label></td>
                            <td><input type="text" name="username" placeholder="email or username" id="username" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password</label></td>
                            <td><input type="password" placeholder="password" name="password" id="password" /></td>
                        </tr>
                        <tr>
                            <th colSpan="2"><label htmlFor="login"><input type="button" value="login" id="loginBtn" onClick={() => authenticate() } /></label>
                            </th>
                        </tr>
                        <tr>
                            <td colSpan="2" id="logerr"><label htmlFor="error" id="loginError">&nbsp;</label></td>
                        </tr>
                        <tr>
                            <th colSpan="2"><i>Don't have an Account ?</i> <label htmlFor="login">
                                <br /><input type="button" value="Register Here" onClick={() => openRegister()} /></label></th>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>

        </div>
    );
}