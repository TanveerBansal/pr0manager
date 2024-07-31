import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { ToastContainer, toast } from "react-toastify";

export default function AddSubcat() {
  const [allCategory, setAllCategory] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [subCatName, setSubCatName] = useState("")

  useEffect(
    () => {
      let data = {
        status: true
      }
      ApiServices.categoryAll(data)
        .then((catReponse) => {
          setAllCategory(catReponse.data.data)
        })
        .catch((err) => {
          console.log(err)
        })

    }, []
  )

  const handleForm = (e) => {
    e.preventDefault()
    let subCatData = {
      categoryId: categoryId,
      name: subCatName
    }
    ApiServices.subCatAdd(subCatData)
      .then((subCatAddRes) => {
        if (subCatAddRes.data.success === true) {
          setSubCatName("")
          setCategoryId("")
          toast.success(subCatAddRes.data.message)
        }
        else if (subCatAddRes.data.success === false) {
          toast.error(subCatAddRes.data.message)
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
          <h1>Sub-Category</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/admin"}>Home</Link>
              </li>
              <li className="breadcrumb-item">Sub-Category</li>
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
                  <h5 className="card-title">Add Sub-category</h5>
                  {/* Form Elements */}
                  <form onSubmit={handleForm}>
                    {/* <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3 col-form-label">
                        Select Category
                      </label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" />
                      </div>
                    </div> */}
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label">Select Category</label>
                      <div className="col-sm-9">
                        <select className="form-select" aria-label="Default select example" value={categoryId} onChange={(e) => { setCategoryId(e.target.value) }}>
                          <option hidden >Open this & select Category</option>
                          {allCategory.map((el, index) => (
                            <Fragment key={index + 1}>
                              <option value={el._id}>{el.name}</option>
                            </Fragment>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3 col-form-label">
                        Sub-Category Name
                      </label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" value={subCatName} onChange={(e) => { setSubCatName(e.target.value) }} />
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
                  {/* End Form Elements */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


    </Fragment>
  )
}