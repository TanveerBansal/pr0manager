import { Fragment, useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import moment from "moment";

export default function TaskModal({ taskId }) {
    const [taskData, setTaskData] = useState({})
    useEffect(
        () => {
            let singleTaskData = {
                _id: taskId,
            }
            ApiServices.singleTask(singleTaskData)
                .then((taskResponse) => {
                    setTaskData(taskResponse.data.data)
                    // console.log(taskResponse);
                })
                .catch((err) => {
                    console.log(err)
                })
        }, []
    )
let date = moment(taskData.deadline).format("YYYY-MM-DD")
    return (
        <Fragment>
            <div className="card mb-3" style={{ maxWidth: 540 }}>
                <div className="row g-5">
                    {/* <div className="col-md-4">
                        <img src={BASE_URL + employeeData.picture} className="img-fluid rounded-start modal-img" alt="Employee Image" />
                    </div> */}
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{taskData.title}</h5>
                            <p className="card-text modalP" >
                                <span className="modalS" >Description</span> : {taskData.description}
                            </p>
                            <p className="card-text modalP" >
                                <span className="modalS" >Employee</span> : {taskData.employeeId?.name}
                            </p> 
                             <p className="card-text modalP" >
                                <span className="modalS" >Project</span> : {taskData.projectId?.name}
                            </p>
                            
                            <p className="card-text modalP" >
                                <span className="modalS" >DeadLine</span> : {date}
                            </p>
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