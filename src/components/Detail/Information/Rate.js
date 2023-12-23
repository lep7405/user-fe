import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin, selectUserData } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import { ratingProductAction, selectDetail } from "../../../redux/detailSlice";
import axios from "axios";

const Rate = ({ count, rating, color, onRating, id, msg, ratedata }) => {
    const [hoverRating, setHoverRating] = useState(0);
  const ratee = useSelector(selectDetail);
  console.log(ratee)
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin)
  const data = useSelector(selectUserData)
  useEffect(() => {
    const getRatesByMsg = (rates, msg) => {
      if (rates && rates.hasOwnProperty(msg)) {
        return rates[msg];
      }
      return 0;
    };

    const rateValue = getRatesByMsg(ratee, msg);
    
    setHoverRating(rateValue);
    rateValueRef.current = rateValue;
    console.log(rateValue)
  }, [ratee, msg]);
  const rateValueRef = useRef(0);

    const getColor = (index) => {
        if (hoverRating >= index) {
            return color.filled;
        } else if (!hoverRating && rating >= index) {
            return color.filled;
        }

        return color.unfilled;
    };
    const handleRating = (idx) => {
        console.log(idx)
        onRating(idx)
        if (!isLogin) {
            toast("Vui lòng đăng nhập để rating", { type: toast.TYPE.ERROR });
        }
        else {
            onRating(idx)
            console.log(idx)
        }
        const Params = {
            id: id,
            rate: {
                [msg]: idx,
                user: data.userId
            }
        }
        console.log(Params)
        dispatch(ratingProductAction(Params))
    }
    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map((idx) => (
                <FontAwesomeIcon
                    key={idx}
                    className="cursor-pointer"
                    icon="star"
                    onClick={() => handleRating(idx)}
                    style={{ color: getColor(idx) }}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(rateValueRef.current)}
                />
            ));
    }, [count, rating, hoverRating]);

    return <div>{starRating}</div>;
};

Rate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onChange: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string,
    },
};

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "#f5eb3b",
        unfilled: "#DCDCDC",
    },
};

export default Rate;