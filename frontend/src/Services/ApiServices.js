import axios from "axios"


//environment for base url(localhost5000)
// export const BASE_URL = "http://localhost:5000/"
export const BASE_URL = "https://pro-manager-jet.vercel.app/"

class ApiServices {

    getToken(){
        let obj = {
            Authorization: sessionStorage.getItem("token")
        }
        return obj
    }

    login(loginData) {
        return (
            axios.post(BASE_URL + "user/login", loginData)
        )
    }
    // ------------------------admin api--------------------
    dashboard() {
        return (
            axios.post(BASE_URL + "admin/dashboard" ,{}, { headers: this.getToken()})
        )
    }

    // user api
    allUsers(allUsers) {
        return (
            axios.post(BASE_URL + "admin/allusers", allUsers, { headers: this.getToken()})
        )
    }
    singleUser(singleUser) {
        return (
            axios.post(BASE_URL + "admin/single/user", singleUser, { headers: this.getToken()})
        )
    }

    // user api end

    // changes pass api
    adminChangePass(adminChangePass){
        return(
            axios.post(BASE_URL + "admin/changepassword", adminChangePass, { headers: this.getToken()})
        )
    }
    // changes pass api end

    //employee api start
    register(registerData) {
        return (
            axios.post(BASE_URL + "admin/employee/register", registerData, { headers: this.getToken()})
        )
    }
    allEmployee(allEmpData) {
        return (
            axios.post(BASE_URL + "admin/employee/all", allEmpData, { headers: this.getToken()})
        )
    }
    singleEmployee(singleEmployeeData) {
        return (
            axios.post(BASE_URL + "admin/employee/single", singleEmployeeData, { headers: this.getToken()})
        )
    }
    changeStatusEmp(changeStatusData){
        return(
            axios.post(BASE_URL+"admin/employee/status", changeStatusData, { headers: this.getToken()})
        )
    }

    //end employee api

    //Category api start
    categoryAdd(categoryData) {
        return (
            axios.post(BASE_URL + "admin/category/add", categoryData, { headers: this.getToken()})
        )
    }
    categoryAll() {
        return (
            axios.post(BASE_URL + "admin/category/all", {}, { headers: this.getToken()})
        )
    }
    categorySingle(singleCatData) {
        return (
            axios.post(BASE_URL + "admin/category/single", singleCatData, { headers: this.getToken()})
        )
    }
    categoryUpdate(updateCatData) {
        return (
            axios.post(BASE_URL + "admin/category/update", updateCatData, { headers: this.getToken()})
        )
    }
    categoryDelete(deleteCatData) {
        return (
            axios.post(BASE_URL + "admin/category/delete", deleteCatData, { headers: this.getToken()})
        )
    }

    //category api end

    // sub-category start
    subCatAll(allSubCatData) {
        return (
            axios.post(BASE_URL + "admin/subcategory/all", allSubCatData, { headers: this.getToken()})
        )
    }
    subCatAdd(subCatAddData) {
        return (
            axios.post(BASE_URL + "admin/subcategory/add", subCatAddData, { headers: this.getToken()})
        )
    }
    subCatSingle(subCatSingleData) {
        return (
            axios.post(BASE_URL + "admin/subcategory/single", subCatSingleData, { headers: this.getToken()})
        )
    }
    subCatUpdate(subCatUpdateData) {
        return (
            axios.post(BASE_URL + "admin/subcategory/update", subCatUpdateData, { headers: this.getToken()})
        )
    }
    subCatDelete(subCatDeleteData) {
        return (
            axios.post(BASE_URL + "admin/subcategory/delete", subCatDeleteData, { headers: this.getToken()})
        )
    }
    // sub-category end

    //project apii start
    addProject(addProjectData) {
        return (
            axios.post(BASE_URL + "admin/project/add", addProjectData, { headers: this.getToken()})
        )
    }
    allProject(allProjectData) {
        return (
            axios.post(BASE_URL + "admin/project/all", allProjectData, { headers: this.getToken()})
        )
    }
    singleProject(singleProjectData) {
        return (
            axios.post(BASE_URL + "admin/project/single", singleProjectData, { headers: this.getToken()})
        )
    }
    updateProject(updateProjectData) {
        return (
            axios.post(BASE_URL + "admin/project/update", updateProjectData, { headers: this.getToken()})
        )
    }
    deleteProject(deleteProjectData) {
        return (
            axios.post(BASE_URL + "admin/project/delete", deleteProjectData, { headers: this.getToken()})
        )
    }
    //project api end


    //project team api
    addTeam(addTeamData) {
        return (
            axios.post(BASE_URL + "admin/projectteam/add", addTeamData, { headers: this.getToken()})
        )
    }
    allTeam(data) {
        return (
            axios.post(BASE_URL + "admin/projectteam/all", data, { headers: this.getToken()})
        )
    }
    singleTeam(singleTeamData) {
        return (
            axios.post(BASE_URL + "admin/projectteam/single", singleTeamData, { headers: this.getToken()})
        )
    }
    updateTeam(updateTeamData) {
        return (
            axios.post(BASE_URL + "admin/projectteam/update", updateTeamData, { headers: this.getToken()})
        )
    }
    deleteTeam(deleteTeamData) {
        return (
            axios.post(BASE_URL + "admin/projectteam/delete", deleteTeamData, { headers: this.getToken()})
        )
    }
    //project team api end

    //task api
    addTask(addTaskData) {
        return (
            axios.post(BASE_URL + "admin/task/add", addTaskData, { headers: this.getToken()})
        )
    }
    allTask(allTaskData) {
        return (
            axios.post(BASE_URL + "admin/task/all", allTaskData, { headers: this.getToken()})
        )
    }
    singleTask(singleTaskData) {
        return (
            axios.post(BASE_URL + "admin/task/single", singleTaskData, { headers: this.getToken()})
        )
    }
    updateTask(updateTaskData) {
        return (
            axios.post(BASE_URL + "admin/task/update", updateTaskData, { headers: this.getToken()})
        )
    }
    deleteTask(deleteTaskData) {
        return (
            axios.post(BASE_URL + "admin/task/delete", deleteTaskData, { headers: this.getToken()})
        )
    }
    //task api end

    // submit work view api
    submitsAll(allSubmitsData){
        return(
            axios.post(BASE_URL + "admin/work/all" , allSubmitsData, {headers : this.getToken()} )
        )
    }
    submitsSingle(singleSubmitsData){
        return(
            axios.post(BASE_URL + "admin/work/single" , singleSubmitsData, {headers : this.getToken()} )
        )
    }
    // submit work view api end

    // coin api
    coin(coinData){
        return(
            axios.post(BASE_URL+"admin/coin/add" , coinData, { headers: this.getToken()} )
        )
    }
    // coin api end
    // -----------------end for admin--------------------





    //-------------------apis for employee-------------------

    //users api start
    EmpAllUsers(empAllUser) {
        return (
            axios.post(BASE_URL + "employee/allUsers", empAllUser, { headers: this.getToken()})
        )
    }
    EmpSingleUser(empSingleUser) {
        return (
            axios.post(BASE_URL + "employee/singleUser", empSingleUser, { headers: this.getToken()})
        )
    }
    //user api end

    // employee api start
    EmpAll(empAllData) {
        return (
            axios.post(BASE_URL + "employee/all", empAllData, { headers: this.getToken()})
        )
    }
    EmpProfileUpdate(profileData){
        return(
            axios.post(BASE_URL + "employee/profile/update", profileData, { headers: this.getToken()})
        )
    }
    //employee api end


    // changePassword api
    changePass(changeData){
        return(
            axios.post(BASE_URL+"employee/changepassword", changeData, { headers: this.getToken()})
        )
    }
    // changepassword api end

    //project api start
    EmpAllProject(empAllProject) {
        return (
            axios.post(BASE_URL + "employee/project/all", empAllProject, { headers: this.getToken()})
        )
    }
    //project api end

    // task api start
    EmpAllTask(empAllTask) {
        return (
            axios.post(BASE_URL + "employee/task/all", empAllTask, { headers: this.getToken()})
        )
    }

    //task api end

    // project team api start
    EmpAllTeam(empAllTeam) {
        return (
            axios.post(BASE_URL + "employee/projectteam/all", empAllTeam, { headers: this.getToken()})
        )
    }
    // project team api end

    //task api
    EmpAllTask(empAllTask) {
        return (
            axios.post(BASE_URL + "employee/task/all", empAllTask, { headers: this.getToken()})
        )
    }
    EmpSingleTask(empSingleTask) {
        return (
            axios.post(BASE_URL + "employee/task/single", empSingleTask, { headers: this.getToken()})
        )
    }
    EmpTaskProgress(empTaskProgress) {
        return (
            axios.post(BASE_URL + "employee/task/progress", empTaskProgress, { headers: this.getToken()})
        )
    }
    // task api end

    //submit api
    EmpSubmitWork(submitData) {
        return (
            axios.post(BASE_URL+"employee/work/submit", submitData, { headers: this.getToken()})
        )
    }
    EmpUpdateWork(updateData) {
        return (
            axios.post(BASE_URL+"employee/work/update", updateData, { headers: this.getToken()})
        )
    }
    EmpAllWork(allWork) {
        return (
            axios.post(BASE_URL+"employee/work/all", allWork, { headers: this.getToken()})
        )
    }
    // submit api end

    // coin view api 
    allCoins(coinsData){
        return(
            axios.post(BASE_URL+"employee/all/coins" , coinsData, {headers : this.getToken()})
        )
    }
    // coin view api end

}

export default new ApiServices;
// const services = new ApiServices();
// export default services;