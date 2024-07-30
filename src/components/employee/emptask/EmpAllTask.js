import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import moment from "moment";
import Modal from "react-modal"
import EmpTaskModal from "./EmpTaskModal";
import "./empTask.css"
import EmpUpdateTask from "./EmpUpdateTask";

export default function EmpAllTask() {
    const [allTask, setAllTask] = useState([])
    const [submitModal, setSubmitModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [selectId, setSelectId] = useState('')
    const [search, setSearch] = useState("")
    const [refresh, setRefresh] = useState(false)

    const customStyles = {
        content: {
            top: '50%',
            left: '60%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "50%",
            borderStyle: "none",
            background: "transparent"
        },
    };

    const openSubmitModal = (taskId) => {
        setSelectId(taskId)
        setSubmitModal(true)
    }
    const openUpdateModal = (taskId) => {
        setSelectId(taskId)
        setUpdateModal(true)
    }

    useEffect(() => {
        let allTaskData = {
            employeeId: sessionStorage.getItem("userId")
        }
        ApiServices.EmpAllTask(allTaskData)
            .then((taskRes) => {
                // console.log(taskRes);
                if (taskRes.data.success === true) {
                    setAllTask(taskRes.data.data)
                }
                else if (taskRes.data.success === false) {
                    toast.error("Error in loading tasks")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [refresh])


    return (
        <Fragment>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Task</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/admin"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item">Task</li>
                            <li className="breadcrumb-item active">View</li>
                        </ol>
                    </nav>
                </div>

                {/* search bar */}
                <section className="section mb-5 ">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex ">
                            <i className="bi bi-search position-absolute ms-3 mt-2" />
                            <input className="form-control w-75 ps-5" placeholder="Search by task name or task deadline" onChange={(e) => { setSearch(e.target.value) }} />
                        </div>
                    </div>
                </section>
                {/* search bar end */}

                <div className="row">

                    {allTask.filter((items) => {
                        return search.toLowerCase() === "" ? items : items.title.toLowerCase().includes(search) || items.deadline.includes(search)
                    })?.map((el, index) => (
                        <Fragment key={index + 1}>
                            {moment(new Date()).format("YYYY-MM-DD") > moment(el.deadline).format("YYYY-MM-DD") && el.progress != "completed" ?
                                <div className="card emp-task-card   w-100 mx-auto border border-danger border-2 ">
                                    {/* <div className="row "> */}
                                    <div className="card-body text-secondary col ">
                                        <h5 className="card-title text-start text-dark fw-semibold">{el.title}</h5>
                                        <p className="card-text emp-task-des">
                                            Description : <span className=" text-dark fw-semibold">{el.description}</span>
                                        </p>
                                        <div className="card-text text-secondary text-start row ">
                                            <p className="col-3 mb-0">
                                                Deadline : <span className=" text-dark fw-semibold me-2">{moment(el.deadline).format("YYYY-MM-DD")}</span>
                                                <span className={el.progress === "working" ? "badge bg-warning text-capitalize" : el.progress === "completed" ? "badge bg-success text-capitalize" : el.progress === "pending" ? "badge bg-danger text-capitalize" : ""}>{el.progress}</span>
                                            </p>

                                            <p className="col-3 mb-0">
                                                <span>Attachment : </span>
                                                <Link className="card-text" to={BASE_URL + el.attachment} target="_blank">
                                                    Click To View
                                                </Link>
                                            </p>
                                            <div className="card-body col-6 p-0 text-center">
                                                {/* <div className="card-body col"> */}
                                                {el.progress === "completed" ? "" : <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => openSubmitModal(el._id)}>Submit Work</button>}
                                                <button className="btn btn-sm btn-outline-info " onClick={() => openUpdateModal(el._id)}>Update Work</button>
                                                {/* </div> */}
                                            </div>

                                        </div>
                                    </div>

                                    {/* </div> */}

                                    {/* <div className="row"> */}
                                    {/* <div className="card-body col ">
                                        <div className="card-body col" style={{ padding: "5rem" }}>
                                            {el.progress === "completed" ? "" : <button className="btn btn-outline-primary mb-2 " onClick={() => openSubmitModal(el._id)}>Submit Work</button>}
                                            <button className="btn btn-outline-info " onClick={() => openUpdateModal(el._id)}>Update Work</button>
                                        </div>
                                    </div> */}
                                    {/* </div> */}

                                    <div className=" d-flex align-items-center" role="alert">
                                        <i className="bi bi-exclamation-octagon fs-5 mx-2 text-danger"></i>
                                        <div className="text-danger">
                                            The deadline for this task has passed.
                                        </div>
                                    </div>

                                </div>
                                :
                                <div className="card emp-task-card w-100 mx-auto ">
                                    <div className="card-body text-secondary col ">
                                        <h5 className="card-title text-start text-dark fw-semibold">{el.title}</h5>
                                        <p className="card-text emp-task-des">
                                            Description : <span className=" text-dark fw-semibold">{el.description}</span>
                                        </p>
                                        <div className="card-text text-secondary text-start row ">
                                            <p className="col-3 mb-0">
                                                Deadline : <span className=" text-dark fw-semibold me-2">{moment(el.deadline).format("YYYY-MM-DD")}</span>
                                                <span className={el.progress === "working" ? "badge bg-warning text-capitalize" : el.progress === "completed" ? "badge bg-success text-capitalize" : el.progress === "pending" ? "badge bg-danger text-capitalize" : ""}>{el.progress}</span>
                                            </p>

                                            <p className="col-3 mb-0">
                                                <span>Attachment : </span>
                                                <Link className="card-text" to={BASE_URL + el.attachment} target="_blank">
                                                    Click To View
                                                </Link>
                                            </p>
                                            <p className="card-body col-6 p-0 text-center">
                                                {/* <div className="card-body col"> */}
                                                {el.progress === "completed" ? "" : <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => openSubmitModal(el._id)}>Submit Work</button>}
                                                <button className="btn btn-sm btn-outline-info " onClick={() => openUpdateModal(el._id)}>Update Work</button>
                                                {/* </div> */}
                                            </p>

                                        </div>
                                    </div>


                                </div>
                            }

                        </Fragment>
                    ))}
                </div>


                <Modal isOpen={submitModal} style={customStyles} appElement={document.getElementById("root")}>
                    <EmpTaskModal selectId={selectId} selectSubmitModal={setSubmitModal} refresh={setRefresh} />
                    <button className="btn btn-outline-dark fw-bold" onClick={() => { setSubmitModal(false) }}>Close</button>
                </Modal>
                <Modal isOpen={updateModal} style={customStyles} appElement={document.getElementById("root")}>
                    <EmpUpdateTask selectId={selectId} selectUpdateModal={setUpdateModal} />
                    <button className="btn btn-outline-dark fw-bold" onClick={() => { setUpdateModal(false) }}>Close</button>
                </Modal>

            </main>
        </Fragment>
    )
}

{/* <Fragment key={index + 1}>
                        {moment(new Date()).format("YYYY-MM-DD") > moment(el.deadline).format("YYYY-MM-DD") && el.progress != "completed" ?
                            <div className="card  w-50 mx-auto border border-danger border-2 ">
                                <div className="row ">
                                    <div className="card-body col w-50">
                                        <h5 className="card-title">{el.title}</h5>
                                        <p className="card-text task-des">
                                            <span className="text-secondary">Description : </span>{el.description}
                                        </p>
                                        <p className="card-text">
                                            <span className="text-secondary"> Deadline : </span>{moment(el.deadline).format("YYYY-MM-DD")}
                                        </p>
                                        <Link className="card-text row" to={BASE_URL + el.attachment} target="_blank">
                                            <span className="text-primary">Click To View Attachment</span>
                                        </Link>
                                        <p className={el.progress === "working" ? "badge bg-warning text-capitalize" : el.progress === "completed" ? "badge bg-success text-capitalize" : el.progress === "pending" ? "badge bg-danger text-capitalize" : ""}>{el.progress}</p>
                                    </div>
                                    <div className="card-body w-50 col" style={{ padding: "5rem" }}>
                                        {el.progress === "completed" ? "" : <button className="btn btn-outline-primary mb-2 " onClick={() => openSubmitModal(el._id)}>Submit Work</button>}
                                        <button className="btn btn-outline-info " onClick={() => openUpdateModal(el._id)}>Update Work</button>
                                    </div>
                                </div>

                                <div className=" d-flex align-items-center" role="alert">
                                    <i className="bi bi-exclamation-octagon fs-5 mx-2 text-danger"></i>
                                    <div className="text-danger">
                                        The deadline for this task has passed.
                                    </div>
                                </div>

                            </div>
                            :
                            <div className="card  w-50 mx-auto ">
                                <div className="row ">
                                    <div className="card-body col w-50">
                                        <h5 className="card-title">{el.title}</h5>
                                        <p className="card-text task-des">
                                            <span className="text-secondary">Description : </span>{el.description}
                                        </p>
                                        <p className="card-text">
                                            <span className="text-secondary"> Deadline : </span>{moment(el.deadline).format("YYYY-MM-DD")}
                                        </p>
                                        <Link className="card-text row" to={BASE_URL + el.attachment} target="_blank">
                                            <span className="text-primary">Click To View Attachment</span>
                                        </Link>
                                        <p className={el.progress === "working" ? "badge bg-warning text-capitalize" : el.progress === "completed" ? "badge bg-success text-capitalize" : el.progress === "pending" ? "badge bg-danger text-capitalize" : ""}>{el.progress}</p>
                                    </div>
                                    <div className="card-body w-50 col" style={{ padding: "5rem" }}>
                                        {el.progress === "completed" ? "" : <button className="btn btn-outline-primary mb-2 " onClick={() => openSubmitModal(el._id)}>Submit Work</button>}
                                        <button className="btn btn-outline-info " onClick={() => openUpdateModal(el._id)}>Update Work</button>
                                    </div>
                                </div>


                            </div>
                        }

                    </Fragment> */}