import React, { useEffect, useState } from "react";
import Rate from "./Rate"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectUserData } from "../../../redux/authSlice";
import { getRatingAction, selectDetail } from "../../../redux/detailSlice";
// import { selectUserData } from "../features/authen/authenSlice";
const Rating = ({ id, msg }) => {
    const [rating, setRating] = useState(0);
    const [ratedata, setRatedata] = useState([]);
    const data = useSelector(selectUserData)
    const ratee = useSelector(selectDetail)
    
    console.log(ratee)
    const dispatch = useDispatch()
    // Thêm id và msg vào dependency array để useEffect theo dõi thay đổi của chúng
    useEffect(() => {
        dispatch(getRatingAction({ userId: data.userId, id }))
    }, [id, msg,dispatch]);
    return (
        <>
            <div className="row">
                <div className="col text-center flex">
                    <p className="text-lg text-gray-800">{msg}</p>
                    <Rate rating={rating} onRating={(rate) => setRating(rate)} id={id} className='ml-5' msg={msg} ratedata={ratedata} />
                </div>
            </div>
        </>
    );
};
export default Rating;