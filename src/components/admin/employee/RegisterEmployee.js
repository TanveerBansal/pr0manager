import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import ApiServices from "../../../Services/ApiServices"
import { 
     toast } from "react-toastify"

export default function RegisterEmployee() {
    const [registerName, setRegisterName] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerContact, setRegisterContact] = useState("")
    const [registerPictureName, setRegisterPictureName] = useState("")
    const [registerPicture, setRegisterPicture] = useState({})
    const [registerJoiningdate, setRegisterJoiningdate] = useState("")
    const [registerExperience, setRegisterExperience] = useState("")
    const [registerJobtitle, setRegisterJobtitle] = useState("")
    const [registerCoins, setRegisterCoins] = useState("")

    const pictureUpload = (e) => {
        setRegisterPictureName(e.target.value)
        setRegisterPicture(e.target.files[0])
    }

    const handleForm = (e) => {
        e.preventDefault()
        const registerData = new FormData()
        registerData.append("name", registerName)
        registerData.append("email", registerEmail)
        registerData.append("password", registerPassword)
        registerData.append("contact", registerContact)
        registerData.append("picture", registerPicture)
        registerData.append("joiningdate", registerJoiningdate)
        registerData.append("experience", registerExperience)
        registerData.append("jobtitle", registerJobtitle)
        registerData.append("coins", registerCoins)

        ApiServices.register(registerData)
            .then((registerRes) => {
                if (registerRes.data.success === true) {
                    toast.success(registerRes.data.message)
                    setRegisterName("")
                    setRegisterEmail("")
                    setRegisterPassword("")
                    setRegisterContact("")
                    setRegisterPictureName("")
                    setRegisterPicture({})
                    setRegisterJoiningdate("")
                    setRegisterExperience("")
                    setRegisterJobtitle("")
                    setRegisterCoins("")
                }
                else if (registerRes.data.success === false) {
                    toast.error(registerRes.data.message)
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
                        <h1>Register</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"/admin"}>Home</Link>
                                </li>
                                <li className="breadcrumb-item">Employee</li>
                                <li className="breadcrumb-item active">Register</li>
                            </ol>
                        </nav>
                    </div>
                    {/* End Page Title */}
                    <section className="section">
                        <div className="row">
                            <div className="col-lg-8 offset-2">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Employee Register Form</h5>
                                        {/* Register Form */}
                                        <form onSubmit={handleForm}>
                                            <div className="row mb-3">
                                                <label
                                                    htmlFor="inputText"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Name
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" value={registerName} onChange={(e)=>{setRegisterName(e.target.value)}}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label
                                                    htmlFor="inputEmail"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Email
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="email" className="form-control" value={registerEmail} onChange={(e)=>{setRegisterEmail(e.target.value)}}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label
                                                    htmlFor="inputPassword"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Password
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="password" className="form-control" value={registerPassword} onChange={(e)=>{setRegisterPassword(e.target.value)}}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label
                                                    htmlFor="inputNumber"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Contact
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="number" className="form-control"value={registerContact} onChange={(e)=>{setRegisterContact(e.target.value)}} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label
                                                    htmlFor="inputNumber"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Picture
                                                </label>
                                                <div className="col-sm-10">
                                                    <input className="form-control" type="file" id="formFile" value={registerPictureName} onChange={pictureUpload} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label
                                                    htmlFor="inputDate"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Joining-Date
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="date" className="form-control" value={registerJoiningdate} onChange={(e)=>{setRegisterJoiningdate(e.target.value)}} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label
                                                    htmlFor="inputExp"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Experience
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" value={registerExperience} onChange={(e)=>{setRegisterExperience(e.target.value)}} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label
                                                    htmlFor="inputTitle"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Job-Title
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" value={registerJobtitle} onChange={(e)=>{setRegisterJobtitle(e.target.value)}} />
                                                </div>
                                            </div>
                                            {/* <div className="row mb-3">
                                                <label
                                                    htmlFor="inputNumber"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Coins
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="number" className="form-control" value={registerCoins} onChange={(e)=>{setRegisterCoins(e.target.value)}} />
                                                </div>
                                            </div> */}


                                            {/* <div className="row mb-3">
                                                <label
                                                    htmlFor="inputTime"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Time
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="time" className="form-control" />
                                                </div>
                                            </div> */}
                                            {/* <div className="row mb-3">
                                                <label
                                                    htmlFor="inputColor"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Color Picker
                                                </label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="color"
                                                        className="form-control form-control-color"
                                                        id="exampleColorInput"
                                                        defaultValue="#4154f1"
                                                        title="Choose your color"
                                                    />
                                                </div>
                                            </div> */}
                                            {/* <div className="row mb-3">
                                                <label
                                                    htmlFor="inputPassword"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    Textarea
                                                </label>
                                                <div className="col-sm-10">
                                                    <textarea
                                                        className="form-control"
                                                        style={{ height: 100 }}
                                                        defaultValue={""}
                                                    />
                                                </div>
                                            </div> */}
                                            {/* <fieldset className="row mb-3">
                                                <legend className="col-form-label col-sm-2 pt-0">
                                                    Radios
                                                </legend>
                                                <div className="col-sm-10">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gridRadios"
                                                            id="gridRadios1"
                                                            defaultValue="option1"
                                                            defaultChecked=""
                                                        />
                                                        <label className="form-check-label" htmlFor="gridRadios1">
                                                            First radio
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gridRadios"
                                                            id="gridRadios2"
                                                            defaultValue="option2"
                                                        />
                                                        <label className="form-check-label" htmlFor="gridRadios2">
                                                            Second radio
                                                        </label>
                                                    </div>
                                                    <div className="form-check disabled">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gridRadios"
                                                            id="gridRadios"
                                                            defaultValue="option"
                                                            disabled=""
                                                        />
                                                        <label className="form-check-label" htmlFor="gridRadios3">
                                                            Third disabled radio
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset> */}
                                            {/* <div className="row mb-3">
                                                <legend className="col-form-label col-sm-2 pt-0">
                                                    Checkboxes
                                                </legend>
                                                <div className="col-sm-10">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="gridCheck1"
                                                        />
                                                        <label className="form-check-label" htmlFor="gridCheck1">
                                                            Example checkbox
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="gridCheck2"
                                                            defaultChecked=""
                                                        />
                                                        <label className="form-check-label" htmlFor="gridCheck2">
                                                            Example checkbox 2
                                                        </label>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div className="row mb-3">
                                                <label className="col-sm-2 col-form-label">Disabled</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue="Read only / Disabled"
                                                        disabled=""
                                                    />
                                                </div>
                                            </div> */}
                                            {/* <div className="row mb-3">
                                                <label className="col-sm-2 col-form-label">Select</label>
                                                <div className="col-sm-10">
                                                    <select
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                    >
                                                        <option selected="">Open this select menu</option>
                                                        <option value={1}>One</option>
                                                        <option value={2}>Two</option>
                                                        <option value={3}>Three</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            {/* <div className="row mb-3">
                                                <label className="col-sm-2 col-form-label">
                                                    Multi Select
                                                </label>
                                                <div className="col-sm-10">
                                                    <select
                                                        className="form-select"
                                                        multiple=""
                                                        aria-label="multiple select example"
                                                    >
                                                        <option selected="">Open this select menu</option>
                                                        <option value={1}>One</option>
                                                        <option value={2}>Two</option>
                                                        <option value={3}>Three</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <button type="submit" className="btn btn-primary">
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        {/* End Register Form  */}
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



