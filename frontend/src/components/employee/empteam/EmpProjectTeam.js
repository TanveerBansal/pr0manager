import { Fragment, useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import { Link } from "react-router-dom";
import "./empProjectTeam.css"

export default function EmpProjectTeam() {
    const [allTeam, setAllTeam] = useState([])

    useEffect(() => {
        let allTeamData = {
            employeeId: sessionStorage.getItem("userId")
        }
        ApiServices.EmpAllTeam(allTeamData)
            .then((teamRes) => {
                // console.log(teamRes);
                setAllTeam(teamRes.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <Fragment>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Involved In Projects</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/admin"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item">Project-Team</li>
                            <li className="breadcrumb-item active">View</li>
                        </ol>
                    </nav>
                </div>
                {allTeam.map((el, index) => (
                    <Fragment key={index + 1}>
                        <div className="card emp-team-card  mx-auto">
                            <div className="row">
                                <div className="card-body text-start col">
                                    <div className="row mx-0">
                                        <div className="col">
                                            <h5 className="card-title m-0">{el.projectId.name}</h5>
                                        </div>
                                    </div>
                                    <div className="row mx-0 mb-4">
                                        <p className="card-text fw-light col">
                                            Project Description : <span className="text-dark fw-semibold"> {el.projectId.description}</span>
                                        </p>
                                    </div>
                                    <div className="row  mx-0">
                                        <p className="card-text fw-light col-4">
                                            Client :
                                            <span className="text-dark fw-semibold"> {el.projectId.client}</span>
                                        </p>
                                        <p className="card-text fw-light col-4">
                                            Technology :
                                            <span className="text-dark fw-semibold"> {el.projectId.technology}</span>
                                        </p>
                                        <p className="card-text fw-light col-4">
                                            Attachment :
                                            <Link target="_blank" to={BASE_URL + el.projectId.attachment} className="btn btn-sm btn-outline-info mx-2">
                                                Click to view
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="row mx-0">
                                        <p className="col card-text fw-bold">
                                            <span className="text-secondary fw-light">Project Team : </span>{el.employeeId.map((el, index) => (
                                                <Fragment key={index + 1}>
                                                    <li>
                                                        {el.name}
                                                    </li>

                                                </Fragment>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Fragment>
                ))}

            </main>
        </Fragment>
    )
}