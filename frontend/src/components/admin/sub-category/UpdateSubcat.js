import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import { all } from "axios";

export default function UpdateSubCategory() {
    const [subCatName, setSubCatName] = useState("")
    const [category, setcategory] = useState("")
    const [allCategory, setAllCategory] = useState([])

    const params = useParams()
    const id = params.id
    // console.log(id)

    useEffect(() => {
        let allCatData = {
            status: true,
        }
        ApiServices.categoryAll(allCatData)
            .then((catReponse) => {
                setAllCategory(catReponse.data.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, []
    )

    useEffect(() => {
        let data = {
            _id: id,
        }
        ApiServices.subCatSingle(data)
            .then((subCatResponse) => {
                setSubCatName(subCatResponse.data.data.name)
                setcategory(subCatResponse.data.data.categoryId.name)
                // console.log(subCatResponse.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const nav = useNavigate()
    const handleForm = (e) => {
        e.preventDefault();
        let updateSubCatData = {
            _id: id,
            name: subCatName,
        };
        ApiServices.subCatUpdate(updateSubCatData)
            .then((updateRes) => {
                // console.log(updateRes);
                if (updateRes.data.success === true) {
                    toast.success(updateRes.data.message);
                    nav("/admin/sub-category/manage");

                }
                 else if (updateRes.data.success === false) {
                    toast.error(updateRes.data.message);

                }
            })
            .catch((err) => {
                toast.error(err);
            });
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
                            <li className="breadcrumb-item active">Update</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section my-5 py-5">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Update Sub-Category</h5>
                                    {/* Horizontal Form */}
                                    <form onSubmit={handleForm}>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="update-category"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Change Category
                                            </label>
                                            <div className="col-sm-10">
                                                {/* <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputText"
                                                    /> */}
                                                <select className="form-select" aria-label="Default select example" value={category} onChange={(e) => { setcategory(e.target.value) }}>
                                                    <option value="" hidden>{category}</option>
                                                    {allCategory.map((el, index) => (
                                                        <Fragment key={index + 1}>
                                                            <option value={el._id}>{el.name}</option>
                                                        </Fragment>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="update-subcat"
                                                className="col-sm-2 col-form-label"
                                            >
                                                New Name
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputText"
                                                    value={subCatName}
                                                    onChange={(e) => { setSubCatName(e.target.value) }}
                                                />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary mx-4">
                                                Update
                                            </button>
                                            <button type="reset" className="btn btn-secondary">
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
            </main>
            {/* End #main */}

        </Fragment>
    )
}