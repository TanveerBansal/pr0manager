import { Fragment, useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";
import "./compWork.css"

export default function CompWork() {
    const [allWork, setAllWork] = useState([])

    //useeffect for all submitted task work
    useEffect(() => {
        ApiServices.submitsAll()
            .then((response) => {
                console.log(response.data.data);
                if (response.data.success === true) {
                    setAllWork(response.data.data)
                }
                else if (response.data.success === false) {
                    toast.error("Error In Loading Data")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <Fragment>

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Completed Work</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/admin"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Completed Work</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    {allWork.map((el, index) => (
                        <Fragment key={index + 1}>
                            <div className="col-sm-4">
                                <div className="card comp-work-card w-100" >
                                    <div className="card-body text-start">
                                        <h5 className="card-title text-center">{el.taskId.title}</h5>
                                        <p className="card-text comp-work-desc text-body-secondary">
                                            Description : <span className="fw-semibold comp-work-desc-span">{el.taskId.description}</span>
                                        </p>
                                        <h6 className="card-subtitle mb-2 text-body-secondary my-2 ">Project : <span className="comp-work-span fw-semibold">{el.taskId.projectId.name}</span></h6>
                                        <h6 className="card-subtitle mb-2 text-body-secondary my-2">Submitted By : <span className="comp-work-span fw-semibold">{el.taskId.employeeId.name}</span></h6>
                                        <h6 className="card-subtitle mb-2 text-body-secondary my-2">Deadline : <span className="comp-work-span fw-semibold">{moment(el.taskId.deadline).format("YYYY-MM-DD")}</span></h6>
                                        <h6 className="card-subtitle mb-2 text-body-secondary my-2">Work : <Link to={BASE_URL + el.file} target="_blank" className="btn btn-sm btn-outline-primary">
                                            Click to view
                                        </Link></h6>



                                    </div>
                                </div>
                            </div>


                        </Fragment>

                    ))}

                </div>
            </main>
        </Fragment>
    )
}