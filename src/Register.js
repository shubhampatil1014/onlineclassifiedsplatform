export default function Register(){
    const validateOnSelect=(event) => {

    }
    const closeRegister=function(){
        document.getElementById("registerpage").style.display = "none";
    }
    const validateform=(event) => {

    }
    
    return (
        <div className="register" id="registerpage">
	<div className="form-container">
		<div className="close">
			<label htmlFor="close"><button onClick={() => closeRegister()}>X</button></label>
		</div>
		<form id="registerform">
			<table align="center" id="register">
                <tbody>
				<tr>
					<th colSpan="3"><label htmlFor="heading">Register</label></th>
				</tr>
				<tr><td><input type='hidden' value='register' name="action"/></td></tr>
				<tr>
					<td><label htmlFor="name">Name</label></td>
					<td>
						<input type="text" name="firstname"
							placeholder="first name"  id="firstname"/>
						</td><td>
						<input type="text" name="lastname"
							placeholder="last name"  id="lastname"/>
					</td>
				</tr>
				<tr>
					<td></td>
					<td id="error"><label htmlFor="error" id="firstnameError">&nbsp;</label></td>
					<td id="error"><label htmlFor="error" id="lastnameError">&nbsp;</label></td>
				</tr>
				<tr>
					<td><label htmlFor="mobile">Mobile</label></td>
					<td><input type="tel" placeholder="mobile" 	name="mobile" id="mobile"/>
					</td>
					<td id="error">
						<label htmlFor="error" id="mobileError">&nbsp;</label>
					</td>
				</tr>
				<tr>
					<td><label htmlFor="mail">E-mail</label></td>
					<td colSpan="2">
						<input type="email" placeholder="email address"  maxLength="100" name="email" id="mail"/>
					</td>
				</tr>
				<tr>
					<td></td>
					<td colSpan="2" id="error">
						<label htmlFor="error" id="mailError">&nbsp;</label>
					</td>
				</tr>
				<tr>
					<td><label htmlFor="password">Password</label></td>
					<td colSpan="2">
						<input type="password" placeholder="password" name="pass" id="new-password"/>
						<div id="passerror"><label htmlFor="error" id="new-passwordError">&nbsp;</label>
						</div>
					</td>
				</tr>
				<tr>
					<td><label htmlFor="confirm-password">Confirm&hyphen;password</label></td>
					<td colSpan="2">
						<input type="password" placeholder="confirm-password" name="confirm-password" id="confirm-password"/>
						<div id="passerror"><label htmlFor="error" id="confirm-passwordError">&nbsp;</label></div>
					</td>
				</tr>
				<tr>
					<td></td>
					<td colSpan="2" id="error"><label htmlFor="error" id="coursesError">&nbsp;</label></td>
				</tr>
				<tr>
					<td rowSpan="5"><label htmlFor="address">Address  </label></td>
					<td>
						<select name="state"  onChange={() => validateOnSelect(this)} id="state">
							
						</select>
					</td>
					<td>
						<select name="district" defaultValue={"district"} onChange={() => validateOnSelect(this)} id="district" >
							<option value="district" >-- district -- </option>
						</select>
						
					</td>
				</tr>
				<tr>
					<td id="error"><label htmlFor="error" id="stateError">&nbsp;</label></td>
					<td id="error"><label htmlFor="error" id="districtError">&nbsp;</label></td>
				</tr>
				<tr>
					<td>
						<select name="subdistrict" defaultValue={"subdistrict"} onChange={() => validateOnSelect(this)} id="subdistrict">
							<option value="subdistrict" >-- subdistrict -- </option>
						</select>
					</td>
					<td>
						<input type="text" placeholder="pincode" name="pincode" id="pin"/>
					</td>
				</tr>
				<tr>
					<td id="error"><label htmlFor="error" id="subdistrictError">&nbsp;</label></td>
					<td id="error"><label htmlFor="error" id="pinError">&nbsp;</label></td>
				</tr>
				<tr>
					<td colSpan="2"><input type="text" name="city" placeholder="apartment/street/village"
							id="village"/>
					</td>
				</tr>
				<tr>
					<td></td>
					<td colSpan="2" id="error"><label htmlFor="error" id="villageError"><i>&nbsp;</i></label></td>
				</tr>
				<tr>
					<th colSpan="3"><label htmlFor="register"><input type="submit" name="submit" value="register" onClick={() => validateform()}/></label></th>
				</tr>
				<tr>
					<td colSpan="3" id="error"><label id="err">&nbsp;</label></td>
				</tr>
                </tbody>
			</table>
		</form>
	</div>

</div>
    );
}