import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";

export default function Header() {
    const [userData, setUserData] = useState({})

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
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const nav = useNavigate()
    const logOut = () => {
        sessionStorage.clear()
        nav("/")
    }
    const addSidebar = () => {
        document.getElementById("body").classList.toggle('toggle-sidebar')
    }
    return (
        <Fragment>

            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/admin" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span className="d-none d-lg-block">ProManager</span>
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn" onClick={addSidebar} />
                </div>
                {/* End Logo */}

                {/* search bar */}
                {/* <div className="search-bar">
                    <form
                        className="search-form d-flex align-items-center"
                        method="POST"
                        action="#"
                    >
                        <input
                            type="text"
                            name="query"
                            placeholder="Search"
                            title="Enter search keyword"
                        />
                        <button type="submit" title="Search">
                            <i className="bi bi-search" />
                        </button>
                    </form>
                </div> */}
                {/* End Search Bar */}


                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        {/* search icon */}
                        {/* <li className="nav-item d-block d-lg-none">
                            <Link className="nav-link nav-icon search-bar-toggle " to="#">
                                <i className="bi bi-search" />
                            </Link>
                        </li> */}
                        {/* End Search Icon*/}

                        {/* notification nav */}
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                <i className="bi bi-bell" />
                                <span className="badge bg-primary badge-number">4</span>
                            </a> */}
                            {/* End Notification Icon */}
                            {/* <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                <li className="dropdown-header">
                                    You have 4 new notifications
                                    <a href="#">
                                        <span className="badge rounded-pill bg-primary p-2 ms-2">
                                            View all
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="notification-item">
                                    <i className="bi bi-exclamation-circle text-warning" />
                                    <div>
                                        <h4>Lorem Ipsum</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>30 min. ago</p>
                                    </div>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="notification-item">
                                    <i className="bi bi-x-circle text-danger" />
                                    <div>
                                        <h4>Atque rerum nesciunt</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>1 hr. ago</p>
                                    </div>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="notification-item">
                                    <i className="bi bi-check-circle text-success" />
                                    <div>
                                        <h4>Sit rerum fuga</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>2 hrs. ago</p>
                                    </div>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="notification-item">
                                    <i className="bi bi-info-circle text-primary" />
                                    <div>
                                        <h4>Dicta reprehenderit</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>4 hrs. ago</p>
                                    </div>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="dropdown-footer">
                                    <a href="#">Show all notifications</a>
                                </li>
                            </ul> */}
                            {/* End Notification Dropdown Items */}
                        {/* </li> */}
                        {/* End Notification Nav */}

                        {/* message nav */}
                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link nav-icon" to="/admin/chat" >
                                <i className="bi bi-chat-left-text" /> */}
                                {/* <span className="badge bg-success badge-number">3</span> */}
                            {/* </Link> */}
                            {/* End Messages Icon */}
                            {/* <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                <li className="dropdown-header">
                                    You have 3 new messages
                                    <a href="#">
                                        <span className="badge rounded-pill bg-primary p-2 ms-2">
                                            View all
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="message-item">
                                    <a href="#">
                                        <img
                                            src="assets/img/messages-1.jpg"
                                            alt=""
                                            className="rounded-circle"
                                        />
                                        <div>
                                            <h4>Maria Hudson</h4>
                                            <p>
                                                Velit asperiores et ducimus soluta repudiandae labore officia
                                                est ut...
                                            </p>
                                            <p>4 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="message-item">
                                    <a href="#">
                                        <img
                                            src="assets/img/messages-2.jpg"
                                            alt=""
                                            className="rounded-circle"
                                        />
                                        <div>
                                            <h4>Anna Nelson</h4>
                                            <p>
                                                Velit asperiores et ducimus soluta repudiandae labore officia
                                                est ut...
                                            </p>
                                            <p>6 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="message-item">
                                    <a href="#">
                                        <img
                                            src="assets/img/messages-3.jpg"
                                            alt=""
                                            className="rounded-circle"
                                        />
                                        <div>
                                            <h4>David Muldon</h4>
                                            <p>
                                                Velit asperiores et ducimus soluta repudiandae labore officia
                                                est ut...
                                            </p>
                                            <p>8 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="dropdown-footer">
                                    <a href="#">Show all messages</a>
                                </li>
                            </ul> */}
                            {/* End Messages Dropdown Items */}
                        {/* </li> */}
                        {/* End Messages Nav */}
                        <li className="nav-item dropdown pe-3">
                            <a
                                className="nav-link nav-profile d-flex align-items-center pe-0"
                                href="#"
                                data-bs-toggle="dropdown"
                            >
                                <img
                                    // src="assets/img/profile-img.jpg"
                                    alt=""
                                    className="rounded-circle"
                                />
                                <span className="d-none d-md-block dropdown-toggle ps-2">
                                    {userData.name}
                                </span>
                            </a>
                            {/* End Profile Iamge Icon */}
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{userData.name}</h6>
                                    {/* <span>Web Designer</span> */}
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item d-flex align-items-center"
                                        to={"/admin/profile"}
                                    >
                                        <i className="bi bi-person" />
                                        <span>My Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={logOut}>
                                        <i className="bi bi-box-arrow-right" />
                                        <span>Sign Out</span>
                                    </button>
                                </li>
                            </ul>
                            {/* End Profile Dropdown Items */}
                        </li>
                        {/* End Profile Nav */}
                    </ul>
                </nav>
                {/* End Icons Navigation */}
            </header>

        </Fragment>
    )
}