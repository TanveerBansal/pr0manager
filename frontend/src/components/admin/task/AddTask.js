import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ApiServices from "../../../Services/ApiServices"
import { toast } from "react-toastify"

export default function AddTask() {
    const [allProject, setAllProject] = useState([])
    const [projectId, setProjectId] = useState("")
    const [allEmp , setAllEmp] = useState([])  //get data of all user with user type 2
    const [selectedEmp, setSelectedEmp] = useState("")
    const[allSubCat, setAllSubCat] = useState([])
    const[selectedSub, setSelectedSub] = useState("")
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription , setTaskDescription] = useState("")

    const [taskAttachmentName, setTaskAttachmentName] = useState("")
    const [taskAttachment, setTaskAttachment] = useState({})
    const [taskDeadline, setTaskDeadline] = useState("")

    const attachmentUpload = (e) => {
        setTaskAttachmentName(e.target.value)
        setTaskAttachment(e.target.files[0])
    }

    //useEffect for all Project
    useEffect(() => {
        let allProject = {
            status: true
        }
        ApiServices.allProject(allProject)
            .then((allProjectRes) => {
                // console.log(allProjectRes)
                setAllProject(allProjectRes.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    //useEffect for all Users(Emp)
    useEffect(()=>{
       if(!!projectId){
        let data={
            projectId:projectId
        }
        ApiServices.allTeam(data)
        .then((res)=>{
            if(res.data.success){
                setAllEmp(res.data.data[0].employeeId)
                console.log(res)
            }else{
                toast.error("Something went wrong")
            }
        })    
        .catch((err) => {
            console.log(err)
        })
       }
    },[projectId])

    //useEffect for allsub-category
    useEffect(()=>{
        let allSubCat = {
            status : true
        }
        ApiServices.subCatAll(allSubCat)
        .then((allSubRes)=>{
            // console.log(allSubRes.data.data);
            setAllSubCat(allSubRes.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


    const handleForm = (e) => {
        e.preventDefault()
        // let currentDate= new Date()
        // let selectedDate=new Date(taskDeadline)
        // if(currentDate>selectedDate){
        //     toast.error("Please choose a valid date")
        //     return false;
        // }
        const addTaskData = new FormData()
        addTaskData.append("projectId", projectId)
        addTaskData.append("employeeId", selectedEmp)
        addTaskData.append("subcategoryId", selectedSub)
        addTaskData.append("title", taskTitle)
        addTaskData.append("description", taskDescription)
        addTaskData.append("attachment", taskAttachment)
        addTaskData.append("deadline", taskDeadline)

        ApiServices.addTask(addTaskData)
            .then((addTaskRes) => {
                if (addTaskRes.data.success === true) {
                    toast.success(addTaskRes.data.message)
                    setProjectId("")
                    setSelectedEmp("")
                    setSelectedSub("")
                    setTaskTitle("")
                    setTaskDescription("")
                    setTaskAttachmentName("")
                    setTaskAttachment({})
                    setTaskDeadline("")
                }
                else if (addTaskRes.data.success === false) {
                    toast.error(addTaskRes.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something went wrong, Please try later")
            })
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
                                    <h5 className="card-title">Add Task Form</h5>
                                    {/* Task Form */}
                                    <form onSubmit={handleForm}>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="selectProject"
                                                className="col-sm-2 col-form-label"
                                            >
                                                 Project
                                            </label>
                                            <div className="col-sm-10">
                                                <select className="form-select" aria-label="Default select example" value={projectId} onChange={(e) => { setProjectId(e.target.value) }}>
                                                    <option hidden >Open this & select Project</option>
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
                                                htmlFor="selectEmployee"
                                                className="col-sm-2 col-form-label"
                                            >
                                                 Employee
                                            </label>
                                            <div className="col-sm-10">
                                            <select className="form-select" aria-label="Default select example" value={selectedEmp} onChange={(e) => { setSelectedEmp(e.target.value) }}>
                                                    <option hidden >Open this & select Employee</option>
                                                    {allEmp?.map((el, index) => (
                                                        <Fragment key={index + 1}>
                                                            <option value={el._id}>{el.name}</option>
                                                        </Fragment>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="selectSubCat"
                                                className="col-sm-2 col-form-label"
                                            >
                                                SubCategory
                                            </label>
                                            <div className="col-sm-10">
                                            <select className="form-select" aria-label="Default select example" value={selectedSub} onChange={(e) => { setSelectedSub(e.target.value) }}>
                                                    <option hidden  className="">Open this & select Sub-Category</option>
                                                    {allSubCat.map((el, index) => (
                                                        <Fragment key={index + 1}>
                                                            <option value={el._id} >{el.name}</option>
                                                        </Fragment>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputtitle"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Title
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" value={taskTitle} onChange={(e) => { setTaskTitle(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputDesc"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Description
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" value={taskDescription} onChange={(e) => { setTaskDescription(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="attachment"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Attachment
                                            </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="file" id="formFile" value={taskAttachmentName} onChange={attachmentUpload} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputDate"
                                                className="col-sm-2 col-form-label"
                                            >
                                                DeadLine
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="date"  className="form-control" value={taskDeadline} onChange={(e) => { setTaskDeadline(e.target.value) }} />
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary">
                                                    Assign
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* End task Form  */}
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




