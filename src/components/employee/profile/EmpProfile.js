import { Fragment, useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EmpProfile() {
    const [userData, setUserData] = useState({})
    const [empData, setEmpData] = useState({})

    const [updateName, setUpdateName] = useState("")
    const [updateExperience, setUpdateExperience] = useState("")
    const [updateContact, setUpdateContact] = useState("")
    const [updateMail, setUpdateMail] = useState("")
    const [emailPlaceholder, setEmailPlaceholder] = useState("")

    const [previousPicture, setPreviousPicture] = useState("")
    const [updatePicture, setUpdatePicture] = useState({})
    const [updatePictureName, setUpdatePictureName] = useState("")
    const [refresh, setRefresh] = useState(false)

    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newPassAgain, setNewPassAgain] = useState("")

   


    //employee
    useEffect(() => {
        let empData = {
            userId: sessionStorage.getItem("userId")
        }
        ApiServices.EmpAll(empData)
            .then((empRes) => {
                // console.log(empRes)
                if (empRes.data.success === true) {
                    setUpdateName(empRes.data.data[0].name)
                    setUpdateExperience(empRes.data.data[0].experience)
                    setUpdateContact(empRes.data.data[0].contact)
                    setEmailPlaceholder(empRes.data.data[0].email)
                    setPreviousPicture(empRes.data.data[0].picture)
                    // setEmployee_id(empRes.data.data[0]._id)
                }
                else if (empRes.data.success === false) {
                    console.log(empRes.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [refresh])

    //user
    useEffect(() => {
        let data = {
            _id: sessionStorage.getItem("userId")
        }
        ApiServices.EmpSingleUser(data)
            .then((res) => {
                if (res.data.success === true) {
                    setUserData(res.data.data)
                }
                else if (res.data.success === false) {
                    toast.error("Error In Loading Data")
                }
                // console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    //employee
    useEffect(() => {
        let employeeData = {
            userId: sessionStorage.getItem("userId")

        }
        ApiServices.EmpAll(employeeData)
            .then((response) => {
                // console.log(response.data.data[0]);
                setEmpData(response.data.data[0])

            })
            .catch((err) => {
                console.log(err)
            })
    }, [refresh])

    const nav = useNavigate()
    const profileEdit = (e) => {
        e.preventDefault()
        let updateData = new FormData()
        updateData.append("_id", sessionStorage.getItem("userId"))
        updateData.append("name", updateName)
        if (!!updateMail) {
            updateData.append("email", updateMail)
        }
        updateData.append("contact", updateContact)
        updateData.append("experience", updateExperience)
        if (!!updatePictureName) {
            updateData.append("picture", updatePicture)
        }
        ApiServices.EmpProfileUpdate(updateData)
            .then((updateRes) => {
                console.log(updateRes.data)
                if (updateRes.data.success === true) {
                    toast.success(updateRes.data.message)
                    setUpdateMail("")
                    setRefresh(true)
                }
                else if (updateRes.data.success === false) {
                    toast.error(updateRes.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
        setRefresh(false)
    }


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
        ApiServices.changePass(changeData)
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
                                    <img
                                        src={BASE_URL + empData.picture}
                                        alt="Profile"
                                        className="rounded-circle"
                                        style={{ height: "8rem" }}
                                    />
                                    <h2>{empData.name}</h2>
                                    <h3>Web Designer</h3>
                                    {/* <div className="social-links mt-2">
                                        <a href="#" className="twitter">
                                            <i className="bi bi-twitter" />
                                        </a>
                                        <a href="#" className="facebook">
                                            <i className="bi bi-facebook" />
                                        </a>
                                        <a href="#" className="instagram">
                                            <i className="bi bi-instagram" />
                                        </a>
                                        <a href="#" className="linkedin">
                                            <i className="bi bi-linkedin" />
                                        </a>
                                    </div> */}
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
                                                data-bs-target="#profile-edit"
                                            >
                                                Edit Profile
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
                                            {/* <h5 className="card-title">About</h5>
                                            <p className="small fst-italic">
                                                Sunt est soluta temporibus accusantium neque nam maiores
                                                cumque temporibus. Tempora libero non est unde veniam est qui
                                                dolor. Ut sunt iure rerum quae quisquam autem eveniet
                                                perspiciatis odit. Fuga sequi sed ea saepe at unde.
                                            </p> */}
                                            <h5 className="card-title">Profile Details</h5>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                                <div className="col-lg-9 col-md-8">{empData.name}</div>
                                            </div>
                                            {/* <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Company</div>
                                                <div className="col-lg-9 col-md-8">
                                                    Lueilwitz, Wisoky and Leuschke
                                                </div>
                                            </div> */}
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Job-Title</div>
                                                <div className="col-lg-9 col-md-8">{empData.jobtitle}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Experience</div>
                                                <div className="col-lg-9 col-md-8">{empData.experience}</div>
                                            </div>
                                            {/* <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Country</div>
                                                <div className="col-lg-9 col-md-8">USA</div>
                                            </div> */}
                                            {/* <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Address</div>
                                                <div className="col-lg-9 col-md-8">
                                                    A108 Adam Street, New York, NY 535022
                                                </div>
                                            </div> */}
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Contact</div>
                                                <div className="col-lg-9 col-md-8">{empData.contact}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">
                                                    {empData.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade profile-edit pt-3"
                                            id="profile-edit"
                                        >
                                            {/*-------------------- Profile Edit Form------------------- */}
                                            <form onSubmit={profileEdit}>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="profileImage"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Profile Image
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <img className="rounded-circle" style={{ height: "7rem", width: "10rem" }} src={BASE_URL + previousPicture} alt="Profile" />
                                                        <div className="pt-2">
                                                            <input type="file" className="form-control w-50"></input>
                                                            {/* <a
                                                                href="#"
                                                                className="btn btn-primary btn-sm"
                                                                title="Upload new profile image"
                                                            >
                                                                <i className="bi bi-upload" />
                                                            </a> */}

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="fullName"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="fullName"
                                                            type="text"
                                                            className="form-control"
                                                            id="fullName"

                                                            value={updateName}
                                                            onChange={(e) => { setUpdateName(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>


                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="Job"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Experience
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="job"
                                                            type="text"
                                                            className="form-control"
                                                            id="Job"

                                                            value={updateExperience}
                                                            onChange={(e) => { setUpdateExperience(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>


                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="Phone"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Contact
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="phone"
                                                            type="text"
                                                            className="form-control"
                                                            id="Phone"
                                                            value={updateContact}
                                                            onChange={(e) => { setUpdateContact(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="Email"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Email
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            className="form-control"
                                                            id="Email"
                                                            placeholder={emailPlaceholder}
                                                            value={updateMail}
                                                            onChange={(e) => { setUpdateMail(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary" >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </form>
                                            {/* End Profile Edit Form */}
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
                                                            onChange={(e) => { setCurrentPass(e.target.value) }}
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
                                                            onChange={(e) => { setNewPass(e.target.value) }}
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
                                                            onChange={(e) => { setNewPassAgain(e.target.value) }}
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