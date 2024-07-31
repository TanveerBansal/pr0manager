import { Fragment, useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import moment from "moment";
import "./employeeModal.css"

export default function ModalEmployee({ employeeId }) {
    const [employeeData, setEmployeeData] = useState([])
    // let params = useParams();
    // console.log(params.id)
    // const id = params.id;
    useEffect(
        () => {
            let singleEmployeeData = {
                _id: employeeId,
            }
            ApiServices.singleEmployee(singleEmployeeData)
                .then((employeeResponse) => {
                    setEmployeeData(employeeResponse.data.data)
                    console.log(employeeResponse);
                })
                .catch((err) => {
                    console.log(err)
                })
        }, []
    )
    let date = moment(employeeData.joiningdate).format("YYYY-MM-DD")

    // const styleP = {
    //     color : "black"
    // }
    // const styleS = {
    //     color : "gray"
    // }
    return (
        <Fragment>
            <div className="card mb-3" style={{ maxWidth: 540 }}>
                <div className="row g-5">
                    <div className="col-md-4">
                        <img src={BASE_URL + employeeData.picture} className="img-fluid rounded-start modal-img" alt="Employee Image" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{employeeData.name}</h5>
                            <p className="card-text modalP" >
                                <span className="modalS" >Email</span> : {employeeData.email}
                            </p>
                            <p className="card-text modalP" >
                                <span className="modalS" >Contact</span> : {employeeData.contact}
                            </p>
                            <p className="card-text modalP" >
                                <span className="modalS" >Job-Title</span> : {employeeData.jobtitle}
                            </p>
                            <p className="card-text modalP" >
                                <span className="modalS" >Joining-Date</span> : {date}
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