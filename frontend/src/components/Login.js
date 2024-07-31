// import axios from "axios";
import { Fragment, useState } from "react"
import "./login.css"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiServices from "../Services/ApiServices";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState("password");
    const [changeImg, setImg] = useState("assets/img/eye-open.png");

    const inputEmail = (e) => {
        setEmail(e.target.value)
    }
    const inputPassword = (e) => {
        setPassword(e.target.value)
    }
    const viewPassword = (e) => {
        if (showPassword === "password") {
            setShowPassword(e.target.type = "text")
            setImg(e.target.src = "assets/img/eye-close.png")
        }
        else if (showPassword === "text") {
            setShowPassword(e.target.type = "password")
            setImg(e.target.src = "assets/img/eye-open.png")
        }
    }

    const nav = useNavigate()
    const handle = (event) => {
        event.preventDefault()
        let data = {
            email: email,
            password: password
        }

        // if (email === "" && password === "") {
        //     toast.warn("Please fill Email & Password")
        // }
        // else if (email === "") {
        //     toast.warn("Please fill Email")
        // }
        // else if (password === "") {
        //     toast.warn("Please fill password")
        // }

        ApiServices.login(data)
            .then((res) => {
                if (res.data.success === true) {
                    toast.success(res.data.message)
                    // console.log(res)
                    sessionStorage.setItem("token", res.data.token)
                    sessionStorage.setItem("userId", res.data.data._id)
                    sessionStorage.setItem("userData", JSON.stringify(res.data.data))
                    if (res.data.data.userType === 1) {
                        nav("/admin")
                        
                    }
                    else if (res.data.data.userType === 2) { 
                        nav("/employee")
                    }
                }
                else if (res.data.success === false) {
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                toast.warn(err)
            })


    }
    return (
        <Fragment>
            <div className="login-container">
                <div className="login-box">
                    <h2 id="login-name">Manager</h2>
                    <br />
                    <form id="log-form" onSubmit={handle}>
                        <div className="user-box user-mail">
                            <img src="/assets/img/person.png" alt="" className="logicon logicon-mail" />
                            <label htmlFor="" className="log-label log-label-mail">Email</label>
                            <input type="text" className="loginput loginput-mail" name="" required="" value={email} onChange={inputEmail} />
                        </div>
                        <div className="user-box user-pass">
                            <img src="/assets/img/key.png" alt="" className="logicon logicon-pass" />
                            <label htmlFor="" className="log-label log-label-pass">Password</label>
                            <input type={showPassword} className="loginput loginput-pass" name="" id="" required="" onChange={inputPassword} />
                            <img src={changeImg} alt="" className="logicon-eye" onClick={viewPassword} />
                        </div>
                        <button id="login-btn">Log in</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}