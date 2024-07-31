import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import moment from "moment";
import { logDOM } from "@testing-library/react";

export default function EmpDashboard() {
    const [allTask, setAllTask] = useState([])
    const [pendingTask, setPendingTask] = useState([])
    const [empDetail, setEmpDetail] = useState({})


    //alltasks
    useEffect(() => {
        let taskData = {
            employeeId: sessionStorage.getItem("userId")
        }
        // console.log(sessionStorage.getItem("userId"))
        ApiServices.EmpAllTask(taskData)
            .then((taskRes) => {
                // console.log(taskRes.data.data)
                if (taskRes.data.success === true) {
                    setAllTask(taskRes.data.data)
                }
                else if (taskRes.data.success === false) {
                    toast.error("Error in Loading task")
                }
            })
    }, [])
    //all pending tasks
    useEffect(() => {
        let taskPending = {
            employeeId: sessionStorage.getItem("userId"),
            progress: ["working", "pending"],
        }
        // console.log(sessionStorage.getItem("userId"))
        ApiServices.EmpAllTask(taskPending)
            .then((taskRes) => {
                // console.log(taskRes.data.data)
                if (taskRes.data.success === true) {
                    setPendingTask(taskRes.data.data)
                }
                else if (taskRes.data.success === false) {
                    toast.error("Error in Loading task")
                }
            })
    }, [])

    //single (employee)
    useEffect(() => {
        let employeeData = {
            userId: sessionStorage.getItem("userId")
        }
        ApiServices.allEmployee(employeeData)
            .then((allEmpRes) => {
                // console.log(allEmpRes.data.data)
                setEmpDetail(allEmpRes.data.data)
            })
    }, [])



    return (
        <Fragment>
            <main id="main" className="main">
                <div>
                    {allTask.map((el, index) => (
                        <Fragment key={index + 1}>
                            {moment(el.deadline).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD") ?
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <i className="bi bi-exclamation-octagon me-1"></i>
                                    Your Task '{el.title}' deadline is due today!
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div> : ""
                            }
                        </Fragment>
                    ))}
                </div>


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
                <section className="section dashboard">
                    <div className="row">
                        {/* Left side columns */}
                        <div className="col-lg-8">
                            <div className="row">
                                {/*  Card */}
                                {/* <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">
                                        
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Projects
                                            </h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-files"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>proj</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}


                                {/* all task card */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">

                                        <div className="card-body">
                                            <h5 className="card-title">
                                                All Tasks
                                            </h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-file-text"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{allTask.length}</h6>
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
                                {/* End all task Card */}


                                {/* pending task card */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">

                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Pending Tasks
                                            </h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon text-warning bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-clipboard-x"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{pendingTask.length}</h6>
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
                                {/* pending task card end */}



                                {/* coin Card */}
                                <div className="col-xxl-4 col-xl-12">
                                    <div className="card info-card customers-card" style={{ maxHeight: "10rem" }}>

                                        <div className="card-body pb-0">
                                            <h5 className="card-title">
                                                Current Coins
                                                {/* <span>| This Year</span> */}
                                            </h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-coin" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{empDetail[0]?.coins}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={"/employee/coin/history"} className="me-3 text-end text-body-tertiary fw-lighter" >View History</Link>
                                    </div>
                                </div>
                                {/* End coin Card */}

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
                                                Remaining <span>| Task</span>
                                            </h5>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Task</th>
                                                        <th scope="col">Submission Date</th>
                                                        {/* <th scope="col">Price</th> */}
                                                        <th scope="col">Progress</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {allTask.map((el, index) => (
                                                        <Fragment key={index + 1}>
                                                            <tr>
                                                                <th scope="row">
                                                                    <a href="#">{index + 1}</a>
                                                                </th>
                                                                <td>{el.employeeId.name}</td>
                                                                <td>
                                                                    <a href="#" className="text-primary">
                                                                        {el.title}
                                                                    </a>
                                                                </td>

                                                                <td>
                                                                    <span className={el.progress === "working" ? "badge bg-warning" : el.progress === "completed" ? "badge bg-success" : el.progress === "pending" ? "badge bg-danger" : ""}>{el.progress}</span>
                                                                </td>
                                                                <td>{el.createdAt}</td>
                                                            </tr>
                                                        </Fragment>
                                                    ))} */}
                                                    {pendingTask.map((el, index) => (
                                                        <Fragment key={index+1}>
                                                            <tr>
                                                                <th scope="row">
                                                                    <a href="#">{index + 1}</a>
                                                                </th>
                                                                <td>
                                                                    <a href="#" className="text-primary">
                                                                        {el.title}
                                                                    </a>
                                                                </td>
                                                                <td>{moment(el.deadline).format("YYYY-MMM-DD")}</td>

                                                                <td>
                                                                    <span className={el.progress === "working" ? "badge bg-warning" : el.progress === "completed" ? "badge bg-success" : el.progress === "pending" ? "badge bg-danger" : ""}>{el.progress}</span>
                                                                </td>
                                                              
                                                            </tr>
                                                        </Fragment>
                                                    ))

                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* End Report */}
                            </div>
                        </div>
                        {/* End Left side columns */}






                    </div>
                </section>
            </main>
        </Fragment>
    )
}