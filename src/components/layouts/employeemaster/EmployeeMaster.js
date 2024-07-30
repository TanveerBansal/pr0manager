import { Fragment } from "react";
import { Navigate, Outlet} from "react-router-dom"
import EmployeeHeader from "./EmployeeHeader";
import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeFooter from "./EmployeeFooter";
import { toast } from "react-toastify";


export default function EmployeeMaster(){
    if(!sessionStorage.getItem("token")){
        toast.error("Please Login")
        return <Navigate to={"/"}/>
    }
    return(
        <Fragment>
            <EmployeeHeader/>
            <EmployeeSidebar/>
            <div style={{minHeight:"80vh"}}>
                <Outlet/>
            </div>
            <EmployeeFooter/>
        </Fragment>
    )
}