import { useState } from "react";
import { isEmailExists } from "./api/Api";

export default function Register() {

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    mail: "",
    pass: "",
    confirmpass: "",
    state: "",
    district: "",
    subdistrict: "",
    pin: "",
    address: ""
  });

  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const closeRegister = () => {
    document.getElementById("registerpage").style.display = "none";
  };

  const validateform = async (e) => {

    e.preventDefault();

    const {
      firstname, lastname, mobile, mail,
      pass, confirmpass, state, district,
      subdistrict, pin, address
    } = user;

    if (!firstname) return setErr("please enter firstname");
    if (!lastname) return setErr("please enter lastname");
    if (!mobile) return setErr("please enter mobile");
    if (!mail) return setErr("please enter email");

    if (!mail.match(/^[a-z][a-z0-9.]+@[a-z][a-z0-9]+\.[a-z]*[a-z]$/))
      return setErr("please check email");

    if (!pass) return setErr("please enter password");
    if (!confirmpass) return setErr("please confirm password");

    if (pass !== confirmpass)
      return setErr("password mismatch");

    if (!state) return setErr("please select state");
    if (!district) return setErr("please select district");
    if (!subdistrict) return setErr("please select subdistrict");

    if (!pin) return setErr("please enter pincode");
    if (!address || address.length < 3)
      return setErr("please enter village");

    if (mobile.length !== 10)
      return setErr("mobile number must be 10 digits");

    setErr("");

    const fullname = firstname + " " + lastname;

    try {

      // ===== CHECK EMAIL =====
      const emailRes = await isEmailExists(mail);

      if (emailRes.data === "exists")
        return setErr("Email Already Exists..");

      // ===== REGISTER =====
      const formData = new FormData();

      Object.keys(user).forEach(k => {
        formData.append(k, user[k]);
      });

      formData.append("fullname", fullname);

      const res = await fetch("/register", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error();

      window.location.href = "/index.html?status=success";

      setUser({
        firstname: "",
        lastname: "",
        mobile: "",
        mail: "",
        pass: "",
        confirmpass: "",
        state: "",
        district: "",
        subdistrict: "",
        pin: "",
        address: ""
      });

    } catch {
      setErr("Some Error..");
    }
  };

  return (

	<>
	<style>
		{
			`
			/* ===== REGISTER ROOT ===== */
			.register{
			position: fixed;
			inset: 0;
			background: rgba(0,0,0,0.45);
			display:flex;
			justify-content:center;
			align-items:center;
			z-index:9999;
			font-family: Arial, Helvetica, sans-serif;
			}

			/* ===== FORM BOX ===== */
			.register .form-container{
			background:white;
			width:420px;
			max-width:92%;
			padding:35px 30px 28px;
			border-radius:14px;
			box-shadow:0 20px 60px rgba(0,0,0,0.25);
			position:relative;
			animation:registerPop .25s ease;
			}

			@keyframes registerPop{
			from{ transform:scale(.92); opacity:0 }
			to{ transform:scale(1); opacity:1 }
			}

			/* ===== CLOSE BUTTON ===== */
			.register .close{
			position:absolute;
			right:12px;
			top:10px;
			}

			.register .close button{
			border:none;
			background:#f1f1f1;
			width:32px;
			height:32px;
			border-radius:50%;
			cursor:pointer;
			font-weight:bold;
			transition:.2s;
			}

			.register .close button:hover{
			background:#e3e3e3;
			}

			/* ===== HEADING ===== */
			.register h2{
			margin:0 0 20px;
			text-align:center;
			}

			/* ===== INPUTS ===== */
			.register input{
			width:100%;
			padding:12px 14px;
			margin-bottom:12px;
			border-radius:8px;
			border:1px solid #d6d6d6;
			font-size:14px;
			transition:.2s;
			box-sizing:border-box;
			}

			.register input:focus{
			outline:none;
			border-color:#3b82f6;
			box-shadow:0 0 0 3px rgba(59,130,246,.15);
			}

			/* ===== BUTTON ===== */
			.register button[type="submit"]{
			width:100%;
			margin-top:10px;
			padding:13px;
			border:none;
			border-radius:9px;
			background:#3b82f6;
			color:white;
			font-size:15px;
			font-weight:600;
			cursor:pointer;
			transition:.2s;
			}

			.register button[type="submit"]:hover{
			background:#2563eb;
			}

			/* ===== ERROR ===== */
			.register .error,
			.register div[style*="red"]{
			margin-top:10px;
			text-align:center;
			font-size:13px;
			font-weight:500;
			}

			/* ===== MOBILE ===== */
			@media(max-width:480px){
			.register .form-container{
				padding:26px 18px 20px;
			}
			}

			`
		}
	</style>
	
    <div className="register" id="registerpage">

      <div className="form-container">

        <div className="close">
          <button onClick={closeRegister}>X</button>
        </div>

        <form onSubmit={validateform}>

          <h2>Register</h2>

          <input name="firstname" placeholder="First Name"
            value={user.firstname} onChange={handleChange} />

          <input name="lastname" placeholder="Last Name"
            value={user.lastname} onChange={handleChange} />

          <input name="mobile" placeholder="Mobile"
            value={user.mobile} onChange={handleChange} />

          <input name="mail" placeholder="Email"
            value={user.mail} onChange={handleChange} />

          <input type="password" name="pass" placeholder="Password"
            value={user.pass} onChange={handleChange} />

          <input type="password" name="confirmpass" placeholder="Confirm Password"
            value={user.confirmpass} onChange={handleChange} />

          <input name="state" placeholder="State"
            value={user.state} onChange={handleChange} />

          <input name="district" placeholder="District"
            value={user.district} onChange={handleChange} />

          <input name="subdistrict" placeholder="Subdistrict"
            value={user.subdistrict} onChange={handleChange} />

          <input name="pin" placeholder="Pincode"
            value={user.pin} onChange={handleChange} />

          <input name="address" placeholder="Village / Address"
            value={user.address} onChange={handleChange} />

          <button type="submit">Register</button>

          <div style={{color:"red"}}>{err}</div>

        </form>

      </div>
    </div>
	</>
  );
}
