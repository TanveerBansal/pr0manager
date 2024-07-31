import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function UpdateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [load, setLoad] = useState(true)
  let params = useParams();
  // console.log(params.id)
  const id = params.id;
  useEffect(() => {
    let singleCatData = {
      _id: id,
    };
    ApiServices.categorySingle(singleCatData)
      .then((catResponse) => {
        setCategoryName(catResponse.data.data.name);

      })
      .catch((err) => {
        toast.error(err);
      });
    setTimeout(() => { setLoad(false) }, 500)
  }, []);

  const nav = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    setLoad(true)
    let updateCatData = {
      _id: id,
      name: categoryName,
    };
    ApiServices.categoryUpdate(updateCatData)
      .then((updateRes) => {
        console.log(updateRes);
        if (updateRes.data.success === true) {
          toast.success(updateRes.data.message);
          setTimeout(() => {
            nav("/admin/category/manage");
          }, 900)

        } else if (updateRes.data.success === false) {
          toast.error(updateRes.data.message);

        }
      })
      .catch((err) => {
        toast.error(err);
      });
    setTimeout(() => { setLoad(false) }, 1000)
  };
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
              <li className="breadcrumb-item active">Update</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <ClipLoader loading={load} cssOverride={{ display: "block", margin: "5vh auto" }} />
        <div className={load === true && "d-none"}>
          <section className="section my-5 py-5">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Update Category</h5>
                    {/* Horizontal Form */}
                    <form onSubmit={handleForm}>
                      <div className="row mb-3">
                        <label
                          htmlFor="inputCat"
                          className="col-sm-2 col-form-label"
                        >
                          New Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="inputText"
                            value={categoryName}
                            onChange={(e) => {
                              setCategoryName(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary mx-4">
                          Update
                        </button>
                        <button
                          type="reset"
                          className="btn btn-secondary"
                          onClick={(e) => {
                            setCategoryName("");
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                    {/* End Horizontal Form */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* End #main */}
    </Fragment>
  );
}
