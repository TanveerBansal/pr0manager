import { Fragment, useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import { Link } from "react-router-dom";
// import "./employeeModal.css"

export default function ProjectModal({ projectId }) {
    const [projectData, setProjectData] = useState({})
    useEffect(
        () => {
            let singleProjectData = {
                _id: projectId,
            }
            ApiServices.singleProject(singleProjectData)
                .then((projectResponse) => {
                    setProjectData(projectResponse.data.data)
                    console.log(projectResponse);
                })
                .catch((err) => {
                    console.log(err)
                })
        }, []
    )

    return (
        <Fragment>
            <div className="card mb-3" style={{ maxWidth: 540 }}>
                <div className="row g-5">
                    {/* <div className="col-md-4">
                        <img src={BASE_URL + employeeData.picture} className="img-fluid rounded-start modal-img" alt="Employee Image" />
                    </div> */}
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{projectData.name}</h5>
                            <p className="card-text modalP" >
                                <span className="modalS" >Description</span> : {projectData.description}
                            </p>
                            <p className="card-text modalP" >
                                <span className="modalS" >Client</span> : {projectData.client}
                            </p>
                            <p className="card-text modalP" >
                                <span className="modalS" >Technology</span> : {projectData.technology}
                            </p>
                            <p className="card-text modalP" >
                                <span className="modalS" >File</span> : <Link target="_blank" to={BASE_URL+projectData.attachment}>View</Link>
                            </p>
                            {/* <p className="card-text modalP" >
                                <span className="modalS" >Joining-Date</span> : {date}
                            </p> */}
                            {/* <p className="card-text">
                                <small className="text-body-secondary"></small>
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}