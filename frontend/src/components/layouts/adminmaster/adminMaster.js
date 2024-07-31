import { Fragment } from "react";
import {Navigate, Outlet} from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

export default function AdminMaster(){
    if(!sessionStorage.getItem("token")){
        toast.error("Please login")
        return <Navigate to={"/"}/>
    }
    return(
        <Fragment>
            <Header/>
            <Sidebar/>
            <div style={{minHeight:"80vh"}}>
                <Outlet/>
            </div>
            <Footer/>
        </Fragment>
    )
}