import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";


export default function ManageSubCategory() {

  const [subCategoryData, setSubCategoryData] = useState([])
  const [isChange, setIsChange] = useState(false);

  useEffect(
    () => {
      let data ={
        status : true
      }
      ApiServices.subCatAll(data)
        .then((subcatResponse) => {
          setSubCategoryData(subcatResponse.data.data)
          // console.log(subcatResponse);
        })
        .catch((err) => {
          console.log(err)
        })
    }, [isChange]
  )

  const subCatDelete = (id, status) => {
    // console.log(id, status)
    let subCatDeleteData = {
      _id: id,
      // status: !status,
    };
    ApiServices.subCatDelete(subCatDeleteData)
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
          <div className="pagetitle">
            <h1>Sub-Category</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to={"/admin"}>Home</Link>
                </li>
                <li className="breadcrumb-item">Sub-Category</li>
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
                    <h5 className="card-title">All Sub-Category</h5>
                    {/* Default Table */}
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Category</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <Fragment> */}
                        {subCategoryData.map((el, index) => (
                          <Fragment key={index}>
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>
                                {el.name}
                              </td>
                              <td>
                                {el.categoryId.name}
                              </td>

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
                                  to={"/admin/sub-category/update/" + el._id}
                                  className="dropdown-item"
                                >
                                  Update
                                </Link>
                                <Link
                                  to={"#"}
                                  className="dropdown-item fw-bold text-danger"
                                  onClick={() => {
                                    subCatDelete(el._id, el.status);
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
                    {/* End sub category manage*/}
                  </div>
                </div>
              </div>
            </div>
          </section>
      </main>
    </Fragment>

  )
}