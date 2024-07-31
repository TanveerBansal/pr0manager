import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ApiServices from "../../../Services/ApiServices"
import { toast } from "react-toastify"
import Modal from "react-modal"
import ProjectModal from "./ProjectModal"

export default function ManageProject() {
    const [allprojects, setAllProjects] = useState([])
    const [load, setLoad] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [selectId, setSelectId] = useState("")


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

    const openModal = (projectId) => {
        setSelectId(projectId)

        setIsModal(true)
    }

    useEffect(
        () => {
            let allProjectData = {
                status: true
            }
            ApiServices.allProject(allProjectData)
                .then((response) => {
                    setAllProjects(response.data.data)
                    // console.log(response);
                })
                .catch((err) => {
                    console.log(err)
                })
        }, [load]
    )

    const projectDelete = (id) => {
        let deleteProjectData = {
            _id: id,
        }
        ApiServices.deleteProject(deleteProjectData)
            .then((deleteResponse) => {
                if (deleteResponse.data.success === true) {
                    toast.success(deleteResponse.data.message)
                    setLoad(true)
                }
                else if (deleteResponse.data.success === false) {
                    toast.error(deleteResponse.data.message)
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
                    <h1>Project</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/admin"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item">Project</li>
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
                                    <h5 className="card-title">All Project</h5>
                                    {/* Default Table */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">View</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allprojects.map((el, index) => (
                                                <Fragment key={index}>
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>
                                                            {el.name}
                                                        </td>

                                                        <td>
                                                            <button className="btn btn-outline-dark " onClick={() => openModal(el._id)}>Details</button>
                                                        </td>
                                                        <td className="drodown">
                                                            <Link data-bs-toggle="dropdown" href="#" className="btn p-1" aria-expanded="false">
                                                                <i className="fa-solid fa-bars" aria-hidden="true" style={{ color: "#4185fb" }} />
                                                            </Link>
                                                            <div className="dropdown-menu dropdown-menu-end" style={{}} >
                                                                <Link
                                                                    to={"/admin/project/update/" + el._id}
                                                                    className="dropdown-item"
                                                                >
                                                                    Update
                                                                </Link>
                                                                <Link
                                                                    to={"#"}
                                                                    className="dropdown-item fw-bold text-danger"
                                                                    onClick={() => { projectDelete(el._id) }}
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
                <Modal isOpen={isModal} style={customStyles} appElement={document.getElementById("root")}>
                    <ProjectModal projectId={selectId} />
                    <button className="btn btn-outline-dark fw-bold" onClick={() => { setIsModal(false) }}>Close</button>
                </Modal>
            </main>
            {/* End #main */}
        </Fragment>
    )
}



