import { Fragment, useEffect, useState } from "react";
import ApiServices from "../../../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EmpTaskModal({ selectId, selectSubmitModal, refresh}) {
    const [task, setTask] = useState({})
    const [attachment, setAttachment] = useState({})
    const [attachmentName, setAttachmentName] = useState("")

    const attachmentUpload = (e) => {
        setAttachmentName(e.target.value)
        setAttachment(e.target.files[0])
    }


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
    },[])
    
    const handleForm = (e) => {
        e.preventDefault()
        const submitData = new FormData()
        submitData.append("taskId", selectId)
        submitData.append("file", attachment)


        ApiServices.EmpSubmitWork(submitData)
            .then((submitRes) => {
                if (submitRes.data.success === true) {
                    toast.success(submitRes.data.message)
                    ApiServices.EmpTaskProgress({_id: selectId , progress : "completed"})
                    .then((progressRes)=>{
                        if(progressRes.data.success === true){
                            toast.success(progressRes.data.message)
                            refresh(true)
                        }
                        else if (progressRes.data.success === false){
                            toast.error(progressRes.data.message)
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                    selectSubmitModal(false)
                    refresh(false)
                }
                else if (submitRes.data.success === false) {
                    toast.error(submitRes.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something went wrong, Please try later")
            })
    }

    return (
        <Fragment>
            <div className="card" style={{ width: "25rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <h6 className="card-subtitle mb-2 text-capitalize"><span className="text-secondary">Progress : </span>{task.progress}</h6>
                    {/* <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </p> */}
                    <form onSubmit={handleForm}>
                        <input type="file" className="card-link form-control" style={{ width: "15rem" }} value={attachmentName} onChange={attachmentUpload} />

                        <button className="card-link btn btn-success mt-4">
                            Submit
                        </button>
                    </form>

                </div>
            </div>

        </Fragment>
    )
}