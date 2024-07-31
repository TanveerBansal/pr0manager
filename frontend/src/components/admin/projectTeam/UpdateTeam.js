import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select"
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";

export default function UpdateTeam() {
    const { id } = useParams()
    const [team, setTeam] = useState([])
    const [projectId, setProjectId] = useState("")
    const [allProject, setAllProject] = useState([])
    const [selectedEmp, setselectedEmp] = useState([])
    const [allEmployee, setAllEmployee] = useState([])

    useEffect(() => {
        ApiServices.singleTeam({ _id: id }).then((res) => {
            if (res.data.success) {
                setTeam(res.data.data)
                setProjectId(res.data.data.projectId._id)
                let empData = res.data.data.employeeId
                let newEmpData = empData.map((el, index) => {
                    return { value: el._id, label: el.name }
                })
                setselectedEmp(newEmpData)
            }
            else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
        ApiServices.allProject({ status: true }).then((res) => {
            if (res.data.success) {
                setAllProject(res.data.data)
            }
            else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
        ApiServices.allUsers({ status: true, userType: 2 }).then((res) => {
            if (res.data.success) {
                let allEmpArray = res.data.data
                let newEmpArr = allEmpArray.map((el, index) => {
                    return { value: el._id, label: el.name }
                })
                setAllEmployee(newEmpArr)

            }
            else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }, [])


    const nav = useNavigate()
    const handleForm = (e) => {
        e.preventDefault()
        // if(projectId === ""){
        //     toast.error("Please Select Project Name")
        // }
        // else if (empName === null || empName==="") {
        //     toast.error(
        //        "Please Select Employees"
        //     )

        // }
        // else {
            // console.log(empName)
            let empArr = selectedEmp?.map((el, index) => {
                // console.log(el.value);
                return el.value
            })
            let updateTeamData = {
                _id :id,
                projectId: projectId,
                employees: JSON.stringify(empArr)
            }
            ApiServices.updateTeam(updateTeamData)
                .then((updateRes) => {
                    console.log(updateRes)
                    if (updateRes.data.success === true) {
                        toast.success(updateRes.data.message)
                        nav("/admin/project/team/manage")
                    }
                    else if (updateRes.data.success === false) {
                        toast.error(updateRes.data.message)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        // }

    }



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
                            <li className="breadcrumb-item active">Update</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-8 offset-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Update Project Team</h5>

                                    <form>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="projectName"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Project Name
                                            </label>
                                            <div className="col-sm-10">
                                                <select className="form-select" aria-label="Default select example" value={projectId} onChange={(e) => { setProjectId(e.target.value) }}>
                                                    <option hidden value={""}>Open this & select Project</option>
                                                    {allProject.map((el, index) => (
                                                        <Fragment key={index + 1}>
                                                            <option value={el._id}>{el.name}</option>
                                                        </Fragment>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="projectDescription"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Employees
                                            </label>
                                            <div className="col-sm-10">
                                                {/* <input type="text" className="form-control" /> */}
                                                {/* <Select  options={option} isMulti={true} isClearable={true} isSearchable={true} /> */}
                                                <Select isMulti={true} isClearable={true} isSearchable={true} options={allEmployee} value={selectedEmp} onChange={(e) => { setselectedEmp(e) }} />


                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary" onClick={handleForm}>
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* End project Team  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* End #main */}

        </Fragment>
    )
}