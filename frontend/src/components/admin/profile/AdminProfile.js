import { Fragment, useEffect, useState } from "react";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function AdminProfile() {
    const [userData, setUserData] = useState({})
    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newPassAgain, setNewPassAgain] = useState("")

    // useEfefct for user
    useEffect(() => {
        ApiServices.singleUser({ _id: sessionStorage.getItem("userId") })
            .then((res) => {
                if (res.data.success === true) {
                    setUserData(res.data.data)
                }
                else if (res.data.success === false) {
                    toast.error(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    const nav = useNavigate()
    const changePassword = (e) => {
        e.preventDefault()
        if(newPass !== newPassAgain){
            toast.error("New Passwords do not match")
        }
        else{
            let changeData = {
            _id: sessionStorage.getItem("userId"),
            currentpassword: currentPass,
            newpassword: newPass
        }
        ApiServices.adminChangePass(changeData)
            .then((changePassRes) => {
                if (changePassRes.data.success === true) {
                    toast.success(changePassRes.data.message)
                    sessionStorage.clear()
                    nav("/")
                }
                else if (changePassRes.data.success === false) {
                    toast.error(changePassRes.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            }) 
        }
       
    }

    return (
        <Fragment>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">Users</li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section profile">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                    {/* <img
                                        src="assets/img/profile-img.jpg"
                                        alt="Profile"
                                        className="rounded-circle"
                                    /> */}
                                    <h2>{userData.name}</h2>
                                    {/* <h3>Web Designer</h3> */}

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-body pt-3">
                                    {/* Bordered Tabs */}
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button
                                                className="nav-link active"
                                                data-bs-toggle="tab"
                                                data-bs-target="#profile-overview"
                                            >
                                                Overview
                                            </button>
                                        </li>
                                        

                                        <li className="nav-item">
                                            <button
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#profile-change-password"
                                            >
                                                Change Password
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-2">
                                        <div
                                            className="tab-pane fade show active profile-overview"
                                            id="profile-overview"
                                        >

                                            <h5 className="card-title">Profile Details</h5>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                                <div className="col-lg-9 col-md-8">{userData.name}</div>
                                            </div>
                                            {/* <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Company</div>
                                                <div className="col-lg-9 col-md-8">
                                                    Lueilwitz, Wisoky and Leuschke
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Job</div>
                                                <div className="col-lg-9 col-md-8">Web Designer</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Country</div>
                                                <div className="col-lg-9 col-md-8">USA</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Address</div>
                                                <div className="col-lg-9 col-md-8">
                                                    A108 Adam Street, New York, NY 535022
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Phone</div>
                                                <div className="col-lg-9 col-md-8">(436) 486-3538 x29071</div>
                                            </div> */}
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">
                                                    {userData.email}
                                                </div>
                                            </div>
                                        </div>
                                        

                                        <div className="tab-pane fade pt-3" id="profile-change-password">
                                            {/* Change Password Form */}
                                            <form onSubmit={changePassword}>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="currentPassword"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Current Password
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            className="form-control"
                                                            id="currentPassword"
                                                            value={currentPass}
                                                            onChange={(e)=>{setCurrentPass(e.target.value)}}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="newPassword"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        New Password
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="newpassword"
                                                            type="password"
                                                            className="form-control"
                                                            id="newPassword"
                                                            value={newPass}
                                                            onChange={(e)=>{setNewPass(e.target.value)}}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="renewPassword"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Re-enter New Password
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="renewpassword"
                                                            type="password"
                                                            className="form-control"
                                                            id="renewPassword"
                                                            value={newPassAgain}
                                                            onChange={(e)=>{setNewPassAgain(e.target.value)}}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">
                                                        Change Password
                                                    </button>
                                                </div>
                                            </form>
                                            {/* End Change Password Form */}
                                        </div>
                                    </div>
                                    {/* End Bordered Tabs */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </Fragment>
    )

}