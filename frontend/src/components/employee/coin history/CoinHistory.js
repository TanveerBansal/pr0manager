import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../Services/ApiServices";
import { toast } from "react-toastify";
import moment from "moment";

export default function CoinHistory() {
    const [allCoins, setAllCoins] = useState([])

    // useEffect all coins
    useEffect(() => {
        let data = {
            userId: sessionStorage.getItem("userId")
        }
        ApiServices.allCoins(data)
            .then((coinRes) => {
                // console.log(coinRes.data.data);
                if (coinRes.data.success === true) {
                    setAllCoins(coinRes.data.data)
                }
                else if (coinRes.data.success === true) {
                    toast.error("Error In Loading")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <Fragment>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Coins History</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/employee"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item">Coins</li>
                            <li className="breadcrumb-item active">History</li>
                        </ol>
                    </nav>
                </div>
                {allCoins.map((el, index) => (
                    <Fragment key={index + 1}>
                        <div className="card mx-auto text-start">
                            <div className="row card-body">
                                <div className="col-md-6 py-3 border-bottom">
                                    <div className={el.type === "add" ? "fs-5 fw-semibold text-success " : "fw-semibold fs-5 text-danger"}>
                                        <p className="mb-0">
                                            {el.coinCount} {el.coinCount === 1 ? "Coin is" : "Coins are"} {el.type === "add" ? "Added" : "Deducted"}

                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 py-3  border-bottom">
                                    <p className="text-dark text-end text-opacity-75 ms-5 mb-0 fs-6 fw-lighter">
                                        <span className="">{moment(el.createdAt).format("YYYY-MMM-DD / hh:mm A")}</span>
                                    </p>
                                </div>
                            </div>



                            <div className="row card-body text-start">
                                <div className="col-md-12">
                                    <blockquote className="blockquote mb-0 ">
                                        <p className="text-secondary">Message : <span className="text-dark font-monospace ">{el.message}</span></p>
                                    </blockquote>
                                </div>

                                {/* <p className="text-dark text-end text-opacity-75 mt-4 mb-0">
                                    <span className="">{moment(el.createdAt).format("YYYY-MMM-DD / hh:mm A")}</span>
                                </p> */}
                            </div>
                        </div>
                    </Fragment>
                ))}



            </main>
        </Fragment>
    )
}