export default function Logout(){
const closeLogout=function(){
    document.getElementById("logoutpage").style.display = "none";
}
const restrictBackNavigation = function (){

}

    return (
        <div className="form" id="logoutpage">
	<div className="form-container">
		<div className="close">
			<label htmlFor="close"><button onClick={() => closeLogout()}>X</button></label>
		</div>
		<form id="logoutform">
			<table align="center" id="logout" cellSpacing="30">
				<tbody>
                <tr>
					<th colSpan="2"><label htmlFor="heading">Are you sure want to Logout ?</label></th>
				</tr>
				<tr>
					<th>
						<label htmlFor="cancel"><input type="button" value="cancel" id="cancel"/></label>
						<a href="index.html?action=logout"><label htmlFor="logout"><input type="button" value="logout" id="logoutBtn" onClick={() => restrictBackNavigation()}/></label></a>
					</th>
				</tr>
                </tbody>
			</table>
		</form>
	</div>

</div>
    );
}