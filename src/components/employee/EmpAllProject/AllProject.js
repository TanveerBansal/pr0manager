import { Fragment, useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import "./empAllProject.css"
import { Link } from "react-router-dom";

export default function AllProject() {
    const [allProject, setAllProject] = useState([])

    useEffect(()=>{
        let allProjectData = {
            status : true
        }
        ApiServices.EmpAllProject(allProjectData)
        .then((projectRes)=>{
            // console.log(projectRes)
            if(projectRes.data.success === true){
                setAllProject(projectRes.data.data)
            }
            else if(projectRes.data.success === true){
                toast.error("Error in loading project")
            }
        })
    },[])

    return (
        <Fragment>
            <main id="main" className="main">
            <div className="pagetitle">
                    <h1>All Project</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/admin"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item">Project</li>
                            <li className="breadcrumb-item active">View</li>
                        </ol>
                    </nav>
                </div>
                <div className="container">
                   <div className="row">
                    {allProject.map((el,index)=>(
                        <Fragment key={index+1}>
                         <div className="col-md-4">
                        <div className="card project-card" >
                            <div className="card-body">
                                <h5 className="card-title">{el.name}</h5>
                                {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
                                <p className="card-text">
                                    <span className="text-body-secondary">Description : </span>{el.description}
                                </p>
                                <p className="card-text">
                                <span className="text-body-secondary">Client : </span>{el.client}
                                </p>
                                <p className="card-text">
                                <span className="text-body-secondary">Technology : </span>{el.technology}
                                </p>
                                <p className="card-text">
                                <Link className="text-body-primary" target="_blank" to={BASE_URL + el.attachment}>Click to View Attachment</Link>
                                </p>
                            </div>
                        </div>
                        
                    </div>   
                        </Fragment>
                    ))}
                    
                </div> 
                </div>
                




            </main>
        </Fragment>
    )
}