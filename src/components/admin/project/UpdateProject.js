import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ApiServices from "../../../Services/ApiServices"
import { toast } from "react-toastify"

export default function UpdateProject() {
    const [updateProjectName, setUpdateProjectName] = useState("")
    const [updateDescription, setUpdateDescription] = useState("")
    const [updateAttachmentName, setUpdateAttachmentName] = useState("")
    const [updateAttachment, setUpdateAttachment] = useState({})
    const [previousAttachment, setPreviousAttachment] = useState("")
    const [updateClient, setUpdateClient] = useState("")
    const [updateTechnology, setUpdateTechnology] = useState("")

    const param = useParams()
    const id = param.id
    // console.log(param, id)
    useEffect(() => {
        let data = {
            _id: id
        }
        ApiServices.singleProject(data)
            .then((response) => {
                if (response.data.success === true) {
                    setUpdateProjectName(response.data.data.name)
                    setUpdateDescription(response.data.data.description)
                    // setPreviousAttachment(response.data.data.attachment)
                    setUpdateClient(response.data.data.client)
                    setUpdateTechnology(response.data.data.technology)
                }
                else if (response.data.success === false) {
                    toast.error(response.data.message)
                }
            })
    }, [])


    const nav = useNavigate()

    const handleForm = (e) => {
        e.preventDefault()
        let updateData = new FormData()
        updateData.append("_id", id)
        updateData.append("name", updateProjectName)
        updateData.append("description", updateDescription)
        if (!!updateAttachmentName) {
            updateData.append("attachment", updateAttachment)
        }
        updateData.append("client", updateClient)
        updateData.append("technology", updateTechnology)
        ApiServices.updateProject(updateData)
            .then((response) => {
                if (response.data.success === true) {
                    toast.success(response.data.message);
                    nav("/admin/project/manage")
                }
                else if (response.data.success === false) {
                    toast.error(response.data.message);
                }
            })
            .catch((err) => {
                console.log(err)
            })
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
                                    <h5 className="card-title">Update Project</h5>
                                    {/* Register Form */}
                                    <form onSubmit={handleForm}>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="projectName"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Name
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" value={updateProjectName} onChange={(e) => { setUpdateProjectName(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="projectDescription"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Description
                                            </label>
                                            <div className="col-sm-10">
                                                {/* <input type="text" className="form-control" /> */}
                                                <textarea className="form-control" value={updateDescription} onChange={(e) => { setUpdateDescription(e.target.value) }}>

                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="projectAttachment"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Attachment
                                            </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="file" id="formFile" value={updateAttachmentName} onChange={(e) => { setUpdateAttachmentName(e.target.value); setUpdateAttachment(e.target.files[0]) }} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="projectClient"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Client
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" value={updateClient} onChange={(e) => { setUpdateClient(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="projectTechnology"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Technology
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" value={updateTechnology} onChange={(e) => { setUpdateTechnology(e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary mx-2">
                                                    Update
                                                </button>
                                                <button
                                                    type="reset"
                                                    className="btn btn-secondary"
                                                // onClick={(e) => {
                                                // setCategoryName("");
                                                // }}
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* End project Update  */}
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



