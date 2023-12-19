import React, { useState } from "react";
import Rate from "./Rate"
import { useSelector } from "react-redux";
// import { selectUserData } from "../features/authen/authenSlice";
const Rating = ({ id,msg }) => {
    const [rating, setRating] = useState(0);
    //   const userData = useSelector(selectUserData);

    return (
        <>
            <div className="row">
                <div className="col text-center flex">
                    <p className="text-lg text-gray-800">{msg} - {rating}</p>
                    <Rate rating={rating} onRating={(rate) => setRating(rate)} id={id} className='ml-5'msg={msg}/>
                </div>
            </div>
        </>
    );
};
export default Rating;