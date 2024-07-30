import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import moment from "moment";
import "./adminDash.css"

export default function Admindashboard() {
    const [dashboardData, setDashboardData] = useState([])
    const [allTask, setAllTask] = useState([])
    const sliceTask = allTask.slice(0, 5)
    const [allWork, setAllWork] = useState([])
    const sliceWork = allWork.slice(0, 5)
    // console.log(sliceTask);

    //useEffect dashboard
    useEffect(
        () => {
            ApiServices.dashboard()
                .then((dashboardRes) => {
                    setDashboardData(dashboardRes.data)
                    // console.log(dashboardRes)
                })
                .catch((err) => {
                    console.log(err)
                })
        }, []
    )


    //useEffect for all task
    useEffect(() => {
        ApiServices.allTask({ status: true })
            .then((allTaskRes) => {
                // console.log(allTaskRes);
                if (allTaskRes.data.success === true) {
                    setAllTask(allTaskRes.data.data)
                }
                else if (allTaskRes.data.success === false) {
                    toast.error("Error in Loading Tasks")
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // useEffect all work
    useEffect(() => {
        ApiServices.submitsAll()
            .then((response) => {
                // console.log(response);
                if (response.data.success === true) {
                    setAllWork(response.data.data)
                }
                else if (response.data.success === false) {
                    toast.error(response.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <Fragment>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"#"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section dashboard">
                    <div className="row">
                        {/* Left side columns */}
                        <div className="col-lg-8">
                            <div className="row">
                                {/* Sales Card */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">
                                        {/* <div className="filter">
                                                <Link className="icon" href="#" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots" />
                                                </Link>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6>Filter</h6>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            Today
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            This Month
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            This Year
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Projects
                                                {/* <span>| Today</span> */}
                                            </h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-files"></i>
                                                </div>
                                                <div className="ps-3">

                                                    <h6>{dashboardData.totalprojects}</h6>
                                                    {/* <span className="text-success small pt-1 fw-bold">
                                                            12%
                                                        </span>{" "}
                                                        <span className="text-muted small pt-2 ps-1">
                                                            increase
                                                        </span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Sales Card */}
                                {/* Revenue Card */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">
                                        {/* <div className="filter">
                                                <Link className="icon" href="#" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots" />
                                                </Link>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6>Filter</h6>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            Today
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            This Month
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            This Year
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Tasks
                                                {/* <span>| This Month</span> */}
                                            </h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-file-text"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{dashboardData.totaltasks}</h6>
                                                    {/* <span className="text-success small pt-1 fw-bold">
                                                            8%
                                                        </span>{" "}
                                                        <span className="text-muted small pt-2 ps-1">
                                                            increase
                                                        </span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Revenue Card */}
                                {/* Customers Card */}
                                <div className="col-xxl-4 col-xl-12">
                                    <div className="card info-card customers-card">
                                        {/* <div className="filter">
                                                <Link className="icon" href="#" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots" />
                                                </Link>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6>Filter</h6>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            Today
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            This Month
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" href="#">
                                                            This Year
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Employees
                                                {/* <span>| This Year</span> */}
                                            </h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{dashboardData.totalUsers}</h6>
                                                    {/* <span className="text-danger small pt-1 fw-bold">
                                                            12%
                                                        </span>{" "}
                                                        <span className="text-muted small pt-2 ps-1">
                                                            decrease
                                                        </span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Customers Card */}

                                {/* Report  */}
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        {/* <div className="filter">
                                                <a className="icon" href="#" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots" />
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6>Filter</h6>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Today
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            This Month
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            This Year
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Report <span>| Task</span>
                                            </h5>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Employee</th>
                                                        <th scope="col">Task</th>
                                                        {/* <th scope="col">Price</th> */}
                                                        <th scope="col">Progress</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sliceTask.map((el, index) => (
                                                        <Fragment key={index + 1}>
                                                            <tr>
                                                                <th scope="row">
                                                                    {index + 1}
                                                                </th>
                                                                <td>{el.employeeId.name}</td>
                                                                <td className="text-primary">
                                                                    {el.title}
                                                                </td>

                                                                <td>
                                                                    <span className={el.progress === "working" ? "badge bg-warning" : el.progress === "completed" ? "badge bg-success" : el.progress === "pending" ? "badge bg-danger" : ""}>{el.progress}</span>
                                                                </td>
                                                            </tr>
                                                        </Fragment>
                                                    ))}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* End Report */}
                            </div>
                        </div>
                        {/* End Left side columns */}


                        {/* Right side columns */}
                        <div className="col-lg-4 ">
                            {/* Recent Activity */}
                            <div className="card h-100">
                                {/* <div className="filter">
                                        <a className="icon" href="#" data-bs-toggle="dropdown">
                                            <i className="bi bi-three-dots" />
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Today
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    This Month
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    This Year
                                                </a>
                                            </li>
                                        </ul>
                                    </div> */}


                                <div className="card-body">
                                    <h5 className="card-title">
                                        Recent Uploads <span>| Task</span>
                                    </h5>
                                    <div className="activity">
                                        {sliceWork.map((el, index) => (
                                            <Fragment key={index + 1}>
                                                <div className="activity-item d-flex">
                                                    <div className="activite-label">
                                                        {moment(el.createdAt).fromNow()}
                                                    </div>
                                                    <i className={parseInt(el.autoId) % 2 === 0 ? "bi bi-circle-fill activity-badge text-success align-self-start" : "bi bi-circle-fill activity-badge text-danger align-self-start"} />
                                                    <div className="activity-content text-start text-break dash-rec-work">

                                                        <span>{el.taskId.employeeId.name}</span> uploaded <span>{el.file.match(/\/[^/]+-(.+)/)[1]}</span>
                                                        {/* <a href="#" className="fw-bold text-dark">
                                                        explicabo officiis
                                                    </a>{" "} */}

                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}

                                        {/* End activity item*/}
                                    </div>
                                </div>
                            </div>
                            {/* End Recent Activity */}
                        </div>
                        {/* End Right side columns */}
                    </div>
                </section>
            </main>
            {/* End #main */}

        </Fragment>
    )
}