import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Select from "react-select"
import ApiServices from "../../../Services/ApiServices"
import makeAnimated from 'react-select/animated';
import { toast } from "react-toastify";

export default function AddTeam() {
    const [option, setOption] = useState([])
    const animatedComponents = makeAnimated();
    const [allProjects, setAllProjects] = useState([])
    const [projectId, setProjectId] = useState("")
    const [empName, setEmpName] = useState("")
    // console.log(projectId);



    //useEffect for allProjects
    useEffect(() => {
        let data = {
            status: true
        }
        ApiServices.allProject(data)
            .then((allResponse) => {
                // console.log(allResponse.data.data)
                setAllProjects(allResponse.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    //useEffect for all users
    useEffect(() => {
        let allEmpData = {
            status: true,
            userType: 2
        }
        ApiServices.allUsers(allEmpData)
            .then((res) => {
                // console.log(res.data.data) 
                let allUserArray = (res.data.data)
                let storeDetails = allUserArray.map(
                    (el, index) => {
                        return (
                            { value: el._id, label: el.name }
                        )
                    }
                )
                setOption(storeDetails)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const handleForm = (e) => {
        e.preventDefault()
        if(projectId === ""){
            toast.error("Please Select Project Name")
        }
        else if (empName === null || empName==="") {
            toast.error(
               "Please Select Employees"
            )

        }
        else {
            // console.log(empName)
            let empArr = empName?.map((el, index) => {
                // console.log(el.value);
                return el.value
            })
            // console.log(empArr)
            let addTeamData = {
                projectId: projectId,
                employees: JSON.stringify(empArr)
            }
            ApiServices.addTeam(addTeamData)
                .then((addRes) => {
                    // console.log(addRes)
                    if (addRes.data.success === true) {
                        toast.success(addRes.data.message)
                        setProjectId("")
                        setEmpName("")
                    }
                    else if (addRes.data.success === false) {
                        toast.error(addRes.data.message)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    const selectValue = (e)=>{
        setEmpName(e)
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
                            <li className="breadcrumb-item active">Add</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-8 offset-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Add Project Team</h5>

                                    <form onSubmit={handleForm}>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="projectName"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Project Name
                                            </label>
                                            <div className="col-sm-10">
                                                {/* <input type="text" className="form-control" /> */}
                                                <select className="form-select"  aria-label="Default select example" value={projectId} onChange={(e) => { setProjectId(e.target.value) }}>
                                                    <option hidden value={""}>Open this & select Project</option>
                                                    {allProjects.map((el, index) => (
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
                                                {/* <Select options={option} isMulti={true} isClearable={true} required={true} isSearchable={true} components={animatedComponents} value={empName} onChange={(e) => { setEmpName(e) }}  /> */}
                                                <Select options={option} isMulti={true} isClearable={true}  isSearchable={true} components={animatedComponents} value={empName} onChange={(e)=>{if(e==null || e==""){
                                                    toast.error("Please Select Employee")
                                                    setEmpName("")
                                                    }else {selectValue(e)}} } />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary">
                                                    Add
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



