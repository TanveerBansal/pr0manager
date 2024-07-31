import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import Modal from "react-modal"
import TaskModal from "./TaskModal";
import moment from "moment";
import Select from 'react-select';
import RewardWarning from "./RewardWarning";

export default function ManageTask() {
    const [allTasks, setAllTasks] = useState([])
    const [load, setLoad] = useState(false)
    const [isDetailModal, setIsDetailModal] = useState(false)
    const [selectId, setSelectId] = useState("")
    const [userId, setUserId] = useState("")
    const [search, setSearch] = useState("")
    const [rwModal, setRWModal] = useState(false)



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

    const openDetailModal = (taskId) => {
        setSelectId(taskId)
        setIsDetailModal(true)

    }
    const openRWModal = (taskId, userId) => {
        setSelectId(taskId)
        setUserId(userId)
        setRWModal(true)
    }


    //useEfefct for all task
    useEffect(() => {
        let allData = {
            status: true,
        }
        ApiServices.allTask(allData)
            .then((allTaskRes) => {
                // console.log(allTaskRes)
                setAllTasks(allTaskRes.data.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [load])


    const deleteTask = (id) => {
        let deleteTaskData = {
            _id: id
        }
        ApiServices.deleteTask(deleteTaskData)
            .then((deleteTaskRes) => {
                if (deleteTaskRes.data.success === true) {
                    toast.success(deleteTaskRes.data.message)
                    setLoad(true)
                }
                else if (deleteTaskRes.data.success === false) {
                    toast.error(deleteTaskRes.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        setLoad(false)
    }
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
                            <li className="breadcrumb-item active">Manage</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}

                {/* search bar */}
                <section className="section mb-5">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex ">
                            {/* <span className="mx-3">Filter By : </span> */}

                            <input className="form-control" placeholder="Search by employee name or task progress" onChange={(e) => { setSearch(e.target.value) }} />
                        </div>
                        {/* <div className="col-lg-10 offset-lg-1">
                       
                    </div> */}
                    </div>
                </section>
                {/* search bar end */}

                <section className="section">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">All Tasks</h5>
                                    {/* Default Table */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Task</th>
                                                <th scope="col">Employee Name</th>
                                                <th scope="col">Deadline</th>
                                                <th scope="col">Progress</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allTasks.filter((items) => {
                                                return search.toLowerCase() === "" ? items : items.progress.toLowerCase().includes(search) || items.employeeId.name.includes(search)
                                            })?.map((el, index) => (
                                                <Fragment key={index}>
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>
                                                            {el.title}
                                                        </td>
                                                        <td>
                                                            {el.employeeId.name}
                                                        </td>
                                                        <td>
                                                            {moment(el.deadline).format("YYYY-MM-DD")}
                                                        </td>
                                                        <td>
                                                            <span className={el.progress === "working" ? "badge bg-warning" : el.progress === "completed" ? "badge bg-success" : el.progress === "pending" ? "badge bg-danger" : ""}>{el.progress}</span>

                                                        </td>

                                                        <td className="drodown">
                                                            <Link data-bs-toggle="dropdown" href="#" className="btn p-1" aria-expanded="false">
                                                                <i className="fa-solid fa-bars" aria-hidden="true" style={{ color: "#4185fb" }} />
                                                            </Link>
                                                            <div className="dropdown-menu dropdown-menu-end" style={{}} >
                                                                <Link className="dropdown-item" onClick={() => openDetailModal(el._id)}>Details</Link>
                                                                <Link className="dropdown-item" onClick={() => { openRWModal(el._id, el.employeeId._id) }}>Reward/Warning</Link>
                                                                <Link
                                                                    to={"/admin/task/update/" + el._id}
                                                                    className="dropdown-item"
                                                                >
                                                                    Update
                                                                </Link>
                                                                <Link
                                                                    to={"#"}
                                                                    className="dropdown-item fw-bold  text-danger"
                                                                    onClick={() => { deleteTask(el._id) }}
                                                                >
                                                                    Delete
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* End project manage */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Modal isOpen={isDetailModal} style={customStyles} appElement={document.getElementById("root")}>
                    <TaskModal taskId={selectId} />
                    <button className="btn btn-outline-dark fw-bold" onClick={() => { setIsDetailModal(false) }}>Close</button>
                </Modal>
                <Modal isOpen={rwModal} style={customStyles} appElement={document.getElementById("root")}>
                    <RewardWarning taskId={selectId} userId={userId} selectRwModal={setRWModal} />
                    <button className="btn btn-outline-dark fw-bold" onClick={() => { setRWModal(false) }}>Close</button>
                </Modal>

            </main>
        </Fragment>
    )
}