import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import ApiServices from "../../../Services/ApiServices"
import { toast } from "react-toastify"

export default function AddProject() {
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [attachmentName, setAttachmentName] = useState("")
    const [attachment, setAttachment] = useState({})
    const [client, setClient] = useState("")
    const [technology, setTechnology] = useState("")


    const attachmentUpload = (e) => {
        setAttachmentName(e.target.value)
        setAttachment(e.target.files[0])
    }

    const handleForm = (e) => {
        e.preventDefault()
        const projectData = new FormData()
        projectData.append("name", projectName)
        projectData.append("description", description)
        projectData.append("attachment", attachment)
        projectData.append("client", client)
        projectData.append("technology", technology)

        ApiServices.addProject(projectData)
            .then((response) => {
                if (response.data.success === true) {
                    toast.success(response.data.message)
                    setProjectName("")
                    setDescription("")
                    setAttachmentName("")
                    setAttachment("")
                    setClient("")
                    setTechnology("")
                }
                else if (response.data.success === false) {
                    toast.error(response.data.message)
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
                    <h1>Project</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/admin"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item">Project</li>
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
                                    <h5 className="card-title">Add Project</h5>
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
                                                <input type="text" className="form-control" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} />
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
                                                <textarea className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }}>

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
                                                <input className="form-control" type="file" id="formFile" value={attachmentName} onChange={attachmentUpload} />
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
                                                <input type="text" className="form-control" value={client} onChange={(e) => { setClient(e.target.value) }} />
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
                                                <input type="text" className="form-control" value={technology} onChange={(e) => { setTechnology(e.target.value) }} />
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
                                    {/* End project Form  */}
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



