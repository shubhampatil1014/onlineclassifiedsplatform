import { useEffect, useState } from "react";
import { getCustomerDetails } from "./api/Api";
import { STATIC_CONTENT_PATH } from "./config";

export default function EditProfile() {

    const [profile,setProfile] = useState("");

    useEffect(() => {
        const getCustomerProfile= async () => {
            const profileDetails= await getCustomerDetails();
            setProfile(profileDetails);
        }
        getCustomerProfile();
    },[]);

    return (
        <>
            <style type="text/css">{`
                .edit-profile-container {
                    width: 700px;
                    margin: 50px auto;
                    padding: 30px;
                    border-radius: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    font-family: 'Segoe UI', sans-serif;
                }

                .edit-profile-container h2 {
                    text-align: center;
                    margin-bottom: 25px;
                    color: #333;
                }

                .profile-form-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-content: stretch;
                    flex-wrap: wrap;
                    align-items: baseline;
                }

                .form-div {
                    width: 60%;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 6px;
                    font-weight: 500;
                    color: #333;
                }

                .form-group input[type="text"], .form-group input[type="email"] {
                    width: 80%;
                    padding: 10px 0px 10px 10px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.3s;
                }

                .form-group input:focus {
                    border-color: #4CAF50;
                }

                .form-group input[disabled] {
                    background-color: #f7f7f7;
                    color: #777;
                }

                .save-btn {
                    background-color: #4CAF50;
                    color: white;
                    padding: 12px 0;
                    width: 100%;
                    border: none;
                    border-radius: 20px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: 500;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    transition: background-color 0.3s, transform 0.2s;
                }

                .save-btn:hover {
                    background-color: #45a049;
                    transform: translateY(-1px);
                }

                .profile-picture-wrapper {
                    width: 35%;
                    text-align: center;
                    position: relative;
                }

                .profile-picture {
                    position: absolute;
                    display: inline-flex;
                    margin: 0 auto;
                }

                .profile-picture img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                }

                .upload-btn {
                    position: absolute;
                    text-align: center;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    height: -webkit-fill-available;
                }
            `}</style>
            <div className="main">
                <div className="edit-profile-container">
                    <h2>Edit Profile</h2>
                    <div className="profile-form-wrapper">
                        <div className="form-div">
                            <form id="edit-profile-form" className="edit-profile-form">
                                <div className="form-group">
                                    <label htmlFor="edit-firstname">First Name</label> <input id="edit-firstname" name="firstname" type="text"
                                        placeholder="Enter First Name" defaultValue={profile.firstname ? profile.firstname : ""} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-lastname">Last Name</label> <input id="edit-lastname" name="lastname" type="text"
                                        placeholder="Enter Last Name" defaultValue={profile.lastname ? profile.lastname : ""} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-mobile">Mobile Number</label> <input id="edit-mobile" name="mobile" type="text"
                                        placeholder="Enter Mobile Number" defaultValue={profile.mobile ? profile.mobile : ""} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-email">Email</label> <input id="edit-email" type="email"
                                        value={profile.email ? profile.email : `user@example.com`} disabled />
                                </div>
                                <div>
                                    <input type="hidden" id="profileImage" name="profileImage" />
                                </div>
                                <button id="saveProfile" type="submit" className="save-btn">Save Changes</button>
                            </form>
                        </div>

                        <div className="profile-picture-wrapper">
                            <div className="profile-picture">

                                <input type="file" id="profileUpload" hidden /> <label
                                    htmlFor="profileUpload" className="upload-btn"><img
                                        src={profile.profileImage ? `${STATIC_CONTENT_PATH}/media/images/${profile.profileImage}`: `images/profile.png`} alt="Profile"
                                        id="profilePreview" /></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}