import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { ToastContainer, toast } from "react-toastify";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("")


  const handleForm = (e) => {
    e.preventDefault()
    let categoryData = {
      name: categoryName
    }
    ApiServices.categoryAdd(categoryData)
      .then((catAddRes) => {
        if (catAddRes.data.success === true) {
          toast.success(catAddRes.data.message)
          setCategoryName("")
        }
        else if (catAddRes.data.success === false) {
          toast.error(catAddRes.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Fragment>
      <ToastContainer />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Category</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/admin"}>Home</Link>
              </li>
              <li className="breadcrumb-item">Category</li>
              <li className="breadcrumb-item active">Add</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section my-5 py-5">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add category</h5>
                  {/* General Form Elements */}
                  <form onSubmit={handleForm}>
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        Category Name
                      </label>
                      <div className="col-sm-10">
                        <input type="text" onChange={(e) => { setCategoryName(e.target.value) }} value={categoryName} className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-10 offset-md-1">
                        <button type="submit" className="btn btn-primary">
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


    </Fragment>
  )
}