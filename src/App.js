import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/Login";
import Admindashboard from "./components/admin/adminDash/adminDashboard";
import AdminMaster from "./components/layouts/adminmaster/adminMaster";
import AddCategory from "./components/admin/category/Addcategory";
import UpdateCategory from "./components/admin/category/Updatecategory";
import ManageCategory from "./components/admin/category/ManageCatgeory";
import AddSubcat from "./components/admin/sub-category/AddSubcat";
import ManageSubCategory from "./components/admin/sub-category/ManageSubcat";
import UpdateSubCategory from "./components/admin/sub-category/UpdateSubcat";
import RegisterEmployee from "./components/admin/employee/RegisterEmployee";
import ManageEmployee from "./components/admin/employee/ManageEmployee";
import AddProject from "./components/admin/project/AddProject";
import ManageProject from "./components/admin/project/ManageProject";
import UpdateProject from "./components/admin/project/UpdateProject";
import AddTeam from "./components/admin/projectTeam/AddTeam";
import { ToastContainer } from "react-toastify";
import ManageTeam from "./components/admin/projectTeam/ManageTeam";
import UpdateTeam from "./components/admin/projectTeam/UpdateTeam";
import AddTask from "./components/admin/task/AddTask";
import ManageTask from "./components/admin/task/ManageTask";
import UpdateTask from "./components/admin/task/UpdateTask";
import EmployeeMaster from "./components/layouts/employeemaster/EmployeeMaster";
import AdminChat from "./components/admin/chat/AdminChat";
import EmpDashboard from "./components/employee/EmpDash/EmpDashboard";
import AllProject from "./components/employee/EmpAllProject/AllProject";
import EmpProjectTeam from "./components/employee/empteam/EmpProjectTeam";
import EmpAllTask from "./components/employee/emptask/EmpAllTask";
import EmpProfile from "./components/employee/profile/EmpProfile";
import AdminProfile from "./components/admin/profile/AdminProfile";
import CompWork from "./components/admin/completed work/CompWork";
import CoinHistory from "./components/employee/coin history/CoinHistory";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<AdminMaster />}>
            <Route path="/admin" element={<Admindashboard />} />
            {/* admin Profile */}
            <Route path="/admin/profile" element={<AdminProfile />} />
            {/* admin Profile */}

            {/* employee  */}
            <Route path="/admin/employee/register" element={<RegisterEmployee />} />
            <Route path="/admin/employee/manage" element={<ManageEmployee />} />
            {/* <Route path="/admin/employee/detail/:id" element={<ModalEmployee />} /> */}
            {/* /employee */}

            {/* category  */}
            <Route path="/admin/category/add" element={<AddCategory />} />
            <Route path="/admin/category/update/:id" element={<UpdateCategory />} />
            <Route path="/admin/category/manage" element={<ManageCategory />} />
            {/* /category */}

            {/* sub-category */}
            <Route path="/admin/sub-category/add" element={<AddSubcat />} />
            <Route path="/admin/sub-category/manage" element={<ManageSubCategory />} />
            <Route path="/admin/sub-category/update/:id" element={<UpdateSubCategory />} />
            {/* /sub-category */}

            {/* project */}
            <Route path="/admin/project/add" element={<AddProject />} />
            <Route path="/admin/project/manage" element={<ManageProject />} />
            <Route path="/admin/project/update/:id" element={<UpdateProject />} />
            {/* /project */}

            {/* project team */}
            <Route path="/admin/project/team/add" element={<AddTeam />} />
            <Route path="/admin/project/team/manage" element={<ManageTeam />} />
            <Route path="/admin/project/team/update/:id" element={<UpdateTeam />} />
            {/* /project team */}

            {/* task */}
            <Route path="/admin/task/add" element={<AddTask />} />
            <Route path="/admin/task/manage" element={<ManageTask />} />
            <Route path="/admin/task/update/:id" element={<UpdateTask />} />
            {/* task */}

            {/* completed work view */}
            <Route path="/admin/completed/work" element={<CompWork />} />
            {/* completed work view */}

            {/* chat */}
            <Route path="/admin/chat" element={<AdminChat />} />
            {/* chat */}

          </Route>
          {/* -----------------------------/employee Route----------------- */}
          <Route path="/employee" element={<EmployeeMaster />}>
            <Route path="/employee" element={<EmpDashboard />} />

            {/* emp profile */}
            <Route path="/employee/profile" element={<EmpProfile />} />
            {/* emp profile */}

            {/*emp project   */}
            <Route path="/employee/project/all" element={<AllProject />} />
            {/*emp project   */}

            {/* emp project team  */}
            <Route path="/employee/project/team/view" element={<EmpProjectTeam />} />
            {/* emp project team  */}

            {/* emp task */}
            <Route path="/employee/task/view" element={<EmpAllTask />} />
            {/* emp task */}

            {/* emp coin history */}
            <Route path="/employee/coin/history" element={<CoinHistory/>}/>
            {/* emp coin history */}
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
