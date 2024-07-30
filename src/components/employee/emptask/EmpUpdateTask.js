import { Fragment, useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EmpUpdateTask({ selectId, selectUpdateModal }) {
    const [task, setTask] = useState({})
    const [submittedWork, setSubmittedWork] = useState({})
    const [attachment, setAttachment] = useState({})
    const [attachmentName, setAttachmentName] = useState("")

    const attachmentUpload = (e) => {
        setAttachmentName(e.target.value)
        setAttachment(e.target.files[0])
    }

    // useEffect for task
    useEffect(() => {
        let taskData = {
            _id: selectId
        }
        ApiServices.EmpSingleTask(taskData)
            .then((res) => {
                // console.log(res);
                setTask(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // useEffect for all submitted work
    useEffect(() => {
        let allWork = {
            taskId: selectId
        }
        ApiServices.EmpAllWork(allWork)
            .then((allWorkRes) => {
                console.log(allWorkRes);
                if (allWorkRes.data.success === true) {
                    // console.log(allWorkRes.data.data[0]._id)
                    setSubmittedWork(allWorkRes.data.data[0])
                }
                else if (allWorkRes.data.success === false) {
                    console.log(allWorkRes.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    const handleForm = (e) => {
        e.preventDefault()
        const updateData = new FormData()
        updateData.append("_id", submittedWork._id) //submitted work _id 
        updateData.append("file", attachment)


        ApiServices.EmpUpdateWork(updateData)
            .then((updateRes) => {
                if (updateRes.data.success === true) {
                    toast.success(updateRes.data.message)
                    selectUpdateModal(false)

                }
                else if (updateRes.data.success === false) {
                    toast.error(updateRes.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something went wrong, Please try later")
            })
    }
    console.log(submittedWork);
    return (
        <Fragment>
            <div className="card" style={{ width: "25rem" }}>
                {submittedWork === undefined || submittedWork.length === 0 || submittedWork === null || submittedWork === "" ?
                    <h5 className="p-3 bg-warning-subtle text-dark text-opacity-75 border border-warning  rounded-3" >Can't make an update because you still need to submit work for this task.</h5>
                    :
                    <Fragment>
                        <h5 className="text-center mt-3" style={{ color: "#202ea4" }}>Make Updation</h5>
                        <div className="card-body">
                            <h5 className="card-title">{task?.title}</h5>
                            {/* <h6 className="card-subtitle mb-2"><span className="text-secondary">Progress : </span>{task.progress}</h6> */}

                            <p className="card-text">
                                Previous Work : <Link to={BASE_URL + submittedWork?.file} target="_blank">Click to view</Link>
                                {/* <iframe src={BASE_URL + submittedWork.file}></iframe> */}
                            </p>
                            <form onSubmit={handleForm}>
                                <input type="file" className="card-link form-control" style={{ width: "15rem" }} value={attachmentName} onChange={attachmentUpload} />

                                <button className="card-link btn btn-success mt-4">
                                    Update
                                </button>
                            </form>

                        </div>
                    </Fragment>
                }

            </div>

        </Fragment>
        // <Fragment></Fragment>
    )
}