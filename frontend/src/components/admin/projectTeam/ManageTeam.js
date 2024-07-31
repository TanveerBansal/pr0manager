import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";

export default function ManageTeam() {
    const [teamData, setTeamData] = useState([]);
    const [isChange, setIsChange] = useState(false);


    useEffect(() => {
        ApiServices.allTeam()
            .then((response) => {
                // console.log(response.data.data)
                setTeamData(response.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [isChange]);



    const projectTeamDelete = (id) => {
        console.log(id)
        let deleteProjectTeamData = {
            _id: id,
        };
        ApiServices.deleteTeam(deleteProjectTeamData)
            .then((deleteRes) => {
                if (deleteRes.data.success === true) {
                    toast.success(deleteRes.data.message);
                    setIsChange(true);
                }
                else if (deleteRes.data.success === false) {
                    toast.error(deleteRes.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setIsChange(false);
    };

    return (
        <Fragment>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Project Team</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/admin"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item">Team</li>
                            <li className="breadcrumb-item active">Manage</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">All Prjoect Teams</h5>
                                    {/* Default Table */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Employees</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <Fragment>
                                                {teamData.map((el, index) => (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{el.projectId.name}</td>
                                                            <td>
                                                                {/* <ul> */}
                                                                    {el.employeeId.map((el, index) => (
                                                                        <Fragment key={index + 1}>
                                                                            <li>{el.name}</li>
                                                                        </Fragment>
                                                                    ))}
                                                                {/* </ul> */}

                                                            </td>

                                                            <td className="drodown">
                                                                <Link
                                                                    data-bs-toggle="dropdown"
                                                                    href="#"
                                                                    className="btn p-1"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i
                                                                        className="fa-solid fa-bars"
                                                                        aria-hidden="true"
                                                                        style={{ color: "#4185fb" }}
                                                                    />
                                                                </Link>
                                                                <div
                                                                    className="dropdown-menu dropdown-menu-end"
                                                                    style={{}}
                                                                >
                                                                    <Link
                                                                        to={"/admin/project/team/update/" + el._id}
                                                                        className="dropdown-item"
                                                                    >
                                                                        Update
                                                                    </Link>
                                                                    <Link
                                                                        to={"#"}
                                                                        className="dropdown-item text-danger fw-bold"
                                                                        onClick={() => {
                                                                            projectTeamDelete(el._id);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </Fragment>
                                        </tbody>
                                    </table>
                                    {/* End Table */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Fragment>
    );
}
