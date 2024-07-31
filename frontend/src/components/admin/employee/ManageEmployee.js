import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";

import React from 'react';
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import Example from "./modaldemo";

import Modal from "react-modal"
import ModalEmployee from "./ModalEmployee";
import { toast } from "react-toastify";



export default function ManageEmployee() {
  const [employeeData, setEmployeeData] = useState([])
  const [refresh, setResfresh] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [selectId, setSelectId] = useState('')
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
  useEffect(
    () => {
      ApiServices.allEmployee()
        .then((employeeResponse) => {
          setEmployeeData(employeeResponse.data.data)
          console.log(employeeResponse);
        })
        .catch((err) => {
          console.log(err)
        })
    }, [refresh]
  )
  useEffect(
    () => {
      ApiServices.allEmployee({})
        .then((employeeResponse) => {
          setEmployeeData(employeeResponse.data.data)
          // console.log(employeeResponse);
        })
        .catch((err) => {
          console.log(err)
        })
    }, []
  )


  const changeStatus = (userId, status) => {

    let changeData = {
      _id: userId,
      status: JSON.stringify(!status)
    }
    ApiServices.changeStatusEmp(changeData)
      .then((changeRes) => {
        console.log(changeRes);
        if (changeRes.data.success === true) {
          setResfresh(true)
          toast.success(changeRes.data.message)

        }
        else if (changeRes.data.success === false) {
          toast.error(changeRes.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    setResfresh(false)
  }


  const openModal = (employeeId) => {
    setSelectId(employeeId)

    setIsModal(true)
  }

  return (
    <Fragment>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Employee</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/admin"}>Home</Link>
              </li>
              <li className="breadcrumb-item">Employee</li>
              <li className="breadcrumb-item active">Manage</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section"  >
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="card">
                <div className="card-body" >
                  <h5 className="card-title">All Employee</h5>
                  {/* Default Table */}
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Picture</th>
                        <th scope="col">Name</th>
                        <th scope="col">Block/Unblock</th>
                        <th scope="col">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <Fragment> */}
                      {employeeData.map((el, index) => (
                        <Fragment key={index}>

                          {/* <tr className="accordion accordion-flush" id="accordionFlushExample">
                              <th scope="row">{index + 1}</th>
                              <th scope="row"><img src={"http://localhost:5000/" + el.picture} style={{ height: "70px", width: "70px", borderRadius: "50%" }} alt="pic" /></th>
                              <td className="" style={{ boxSizing: "border-box" }}>
                                {el.name}
                              </td>
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                              >


                              </button>
                               <div
                                id="flush-collapseOne"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  {el.email}
                                </div>
                              </div>



                            </tr> */}

                          <tr className="" >
                            <th scope="row">{index + 1}</th>
                            <th scope="row"><img src={BASE_URL + el.picture} style={{ height: "50px", width: "50px", borderRadius: "50%" }} alt="pic" /></th>
                            <td className="" style={{ boxSizing: "border-box" }}>
                              {el.name}
                            </td>
                            <td>
                              <button className={el.userId.status === true ? "btn btn-outline-danger fw-bold" : "btn btn-outline-success fw-bold"} onClick={() => { changeStatus(el.userId._id, el.userId.status) }}>
                                {el.userId.status === true ? "Click To Block" : el.userId.status === false ? "Click To Unblock" : ""}
                              </button>
                            </td>
                            <td>
                              {/* <Link to={"#"} className="btn btn-outline-success"><i className="bi bi-pencil-square"></i></Link>
                                <button className="btn btn-outline-danger ms-3"><i className="bi bi-trash"></i></button> */}
                              <button className="btn btn-outline-dark " onClick={() => openModal(el._id)}>Details</button>
                              {/* <Link to={"admin/employee/detail"+el._id} onClick={() => { setIsModal(true) }}>modal</Link> */}
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                  {/* End  Table  */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal isOpen={isModal} style={customStyles} appElement={document.getElementById("root")}>
          <ModalEmployee employeeId={selectId} />
          <button className="btn btn-outline-dark fw-bold" onClick={() => { setIsModal(false) }}>Close</button>
        </Modal>
      </main>

    </Fragment>

  )
}