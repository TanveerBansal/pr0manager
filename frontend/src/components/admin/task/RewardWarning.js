import { Fragment, useEffect, useState } from "react";
import ApiServices from "../../../Services/ApiServices";
import "./rewardWarning.css"
import { toast } from "react-toastify";

export default function RewardWarning({ taskId, userId, selectRwModal }) {
    const [taskDetail, setTaskDetail] = useState({})
    const [userDetail, setUserDetail] = useState({})
    const [type, setType] = useState("")
    const [coinCount, setCoinCount] = useState(0)
    const [message, setMessage] = useState("")


    // useEffect for task
    useEffect(() => {
        let taskData = {
            _id: taskId
        }
        ApiServices.singleTask(taskData)
            .then((taskRes) => {
                if (taskRes.data.success === true) {
                    // console.log(taskRes)
                    setTaskDetail(taskRes.data.data)
                }
                else {
                    console.log("Error")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // useEfect for user
    useEffect(() => {
        let data = {
            _id: userId
        }
        ApiServices.singleUser(data)
            .then((userRes) => {
                if (userRes.data.success === true) {
                    // console.log(userRes)
                    setUserDetail(userRes.data.data)
                }
                else if (userRes.data.success === false) {
                    console.log(userRes.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleForm = (e) => {
        e.preventDefault()
        const coinData = {
            userId: userId,
            taskId: taskId,
            type: type,
            coinCount: coinCount,
            message: message
        }
        ApiServices.coin(coinData)
            .then((coinRes) => {
                // console.log(coinRes);
                if (coinRes.data.success === true) {
                    toast.success(coinRes.data.message)
                    selectRwModal(false)
                }
                else if (coinRes.data.success === false) {
                    toast.error(coinRes.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="rw-div">
            <div className="card rw-card  w-75 mb-3">
                <div className="card-body">
                    <h4 className="card-title text-center">Reward Or Warning</h4>

                    <form onSubmit={handleForm}>

                        <div className="row mb-3">
                            <label htmlFor="inputText" className="col-sm-4 col-form-label">
                                Employee Name :
                            </label>
                            <div className="col-sm-8 mt-2">
                                {userDetail.name}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputText" className="col-sm-4 col-form-label">
                                Task Title :
                            </label>
                            <div className="col-sm-8 mt-2">
                                {/* <input type="text" className="form-control" /> */}
                                {taskDetail.title}
                            </div>
                        </div>


                        <div className="row mb-3">
                            <label htmlFor="inputNumber" className="col-sm-4 col-form-label">
                                Coin Count :
                            </label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control w-25" value={coinCount} onChange={(e) => { setCoinCount(e.target.value) }} />
                            </div>
                        </div>

                        <div className="row mb-3 rw-radio-div">
                            <label className="col-sm-4 ">
                                Add
                                <input type="radio" className="my-2 mx-1" name="type" value={"add"} onChange={(e) => { setType(e.target.value) }} />
                            </label>
                            <label className="col-sm-4">
                                Deduct
                                <input type="radio" className="my-2 mx-1" name="type" value={"deduct"} onChange={(e) => { setType(e.target.value) }} />
                            </label>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label">
                                Message :
                            </label>
                            <div className="col-sm-8">
                                <textarea
                                    className="form-control"
                                    style={{ height: 100 }}
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value) }}
                                    placeholder="Type your message here..."
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-sm-5">
                                <button type="submit" className="rw-send-btn btn btn-primary">
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}