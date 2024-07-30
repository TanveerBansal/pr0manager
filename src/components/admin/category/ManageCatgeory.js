import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { ToastContainer, toast } from "react-toastify";

export default function ManageCategory() {
  const [categoryData, setCategoryData] = useState([]);
  const [isChange, setIsChange] = useState(false);


  useEffect(() => {
    ApiServices.categoryAll()
      .then((catResponse) => {
        setCategoryData(catResponse.data.data);
        console.log(catResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isChange]);

  const catDelete = (id, status) => {
    // console.log(id, status)
    let deleteCatData = {
      _id: id,
      // status: !status,
    };
    ApiServices.categoryDelete(deleteCatData)
      .then((deleteRes) => {
        if (deleteRes.data.success === true) {
          toast.success(deleteRes.data.message);
          setIsChange(true);
        } else if (deleteRes.data.success === false) {
          toast.error(deleteRes.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsChange(false);
  };

  return (
    <Fragment>
      <main id="main" className="main">
        <ToastContainer />
        <div className="pagetitle">
          <h1>Category</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/admin"}>Home</Link>
              </li>
              <li className="breadcrumb-item">Category</li>
              <li className="breadcrumb-item active">Manage</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">All Category</h5>
                  {/* Default Table */}
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>

                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <Fragment> */}
                      {categoryData.map((el, index) => (
                        <Fragment key={index}>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{el.name}</td>

                            <td className="drodown">
                              <Link
                                data-bs-toggle="dropdown"
                                href="#"
                                className="btn p-1"
                                aria-expanded="false"
                              >
                                <i
                                  className="fa-solid fa-bars"
                                  aria-hidden="true"
                                  style={{ color: "#4185fb" }}
                                />
                              </Link>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                style={{}}
                              >
                                <Link
                                  to={"/admin/category/update/" + el._id}
                                  className="dropdown-item"
                                >
                                  Update
                                </Link>
                                <Link
                                  to={"#"}
                                  className="dropdown-item fw-bold text-danger"
                                  onClick={() => {
                                    catDelete(el._id, el.status);
                                  }}
                                >
                                  Delete
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                  {/* End Table */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
