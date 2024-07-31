import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <Fragment>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link " to="/admin">
                            <i className="bi bi-grid" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    {/* End Dashboard Nav */}


                    <li className="nav-item">
                        <Link
                            className="nav-link collapsed"
                            data-bs-target="#employee-nav"
                            data-bs-toggle="collapse"
                            to="#"
                        >
                            <i className="bi bi-person-circle"></i>
                            <span>Employee</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </Link>
                        <ul
                            id="employee-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <Link to="/admin/employee/register">
                                    <i className="bi bi-circle" />
                                    <span>Register Employee</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/employee/manage">
                                    <i className="bi bi-circle" />
                                    <span>Manage Employee</span>
                                </Link>
                            </li>

                        </ul>
                    </li>
                    {/* End Employee Nav */}

                    <li className="nav-item">
                        <Link
                            className="nav-link collapsed"
                            data-bs-target="#components-nav"
                            data-bs-toggle="collapse"
                            to="#"
                        >
                            <i className="bi bi-menu-button-wide" />
                            <span>Category</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </Link>
                        <ul
                            id="components-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <Link to="/admin/category/add">
                                    <i className="bi bi-circle" />
                                    <span>Add Category</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/category/manage">
                                    <i className="bi bi-circle" />
                                    <span>Manage Category</span>
                                </Link>
                            </li>

                        </ul>
                    </li>
                    {/* End Category Nav */}
                    <li className="nav-item">
                        <Link
                            className="nav-link collapsed"
                            data-bs-target="#forms-nav"
                            data-bs-toggle="collapse"
                            to="#"
                        >
                            <i className="bi bi-journal-text" />
                            <span>Sub-Category</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </Link>
                        <ul
                            id="forms-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <Link to={"/admin/sub-category/add"}>
                                    <i className="bi bi-circle" />
                                    <span>Add Sub-category</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/admin/sub-category/manage"}>
                                    <i className="bi bi-circle" />
                                    <span>Manage Sub-category</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* End Sub-category Nav */}

                    <li className="nav-item">
                        <Link
                            className="nav-link collapsed"
                            data-bs-target="#project-nav"
                            data-bs-toggle="collapse"
                            to="#"
                        >
                            <i className="bi bi-clipboard-data"></i>
                            <span>Project</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </Link>
                        <ul
                            id="project-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <Link to="/admin/project/add">
                                    <i className="bi bi-circle" />
                                    <span>Add Project</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/project/manage">
                                    <i className="bi bi-circle" />
                                    <span>Manage Projects</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* End Project Nav */}

                    <li className="nav-item">
                        <Link
                            className="nav-link collapsed"
                            data-bs-target="#icons-nav"
                            data-bs-toggle="collapse"
                            to="#"
                        >
                            <i className="bi bi-people"></i>
                            <span>Project Team</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </Link>
                        <ul
                            id="icons-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <Link to="/admin/project/team/add">
                                    <i className="bi bi-circle" />
                                    <span>Add Team</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/project/team/manage">
                                    <i className="bi bi-circle" />
                                    <span>Manage Team</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* End team Nav */}

                    <li className="nav-item">
                        <Link
                            className="nav-link collapsed"
                            data-bs-target="#task-nav"
                            data-bs-toggle="collapse"
                            to="#"
                        >
                            <i className="bi bi-file-text"></i>
                            <span>Task</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </Link>
                        <ul
                            id="task-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <Link to="/admin/task/add">
                                    <i className="bi bi-circle" />
                                    <span>Add Task</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/task/manage">
                                    <i className="bi bi-circle" />
                                    <span>Manage Task</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* End Task  Nav */}

                    {/* completed work nav */}
                    <li className="nav-item">
                        <Link
                            className="nav-link collapsed"
                            to="/admin/completed/work"
                        >
                            <i className="bi bi-list-check"></i>
                            <span>Completed Work</span>
                        </Link>
                    </li>
                    {/* completed work nav end */}


                </ul>
            </aside>
            {/* End Sidebar*/}

        </Fragment>
    )
}