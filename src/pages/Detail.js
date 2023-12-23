import Footer from "../components/Shared/Footer";
import Description from "../components/Detail/Information/Description";
import AmenitiesAndServices from "../components/Detail/Information/AmenitiesAndServices";
import Rates from "../components/Detail/Information/Rates";
import Feedback from "../components/Detail/Information/Feedback";
import BookFormModal from "../components/Detail/BookFormModal";
import PictureContainer from "../components/Detail/PictureContainer/PictureContainer";
import BookingCard from "../components/Detail/BookingCard";
import NotiModal from "../components/Detail/NotiModal";
import Header from "../components/Shared/Header";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { toast } from "react-toastify";
import Rating from "../components/Detail/Information/Rating";
import Comment from "../components/Detail/Information/Comment";
import { GetBillAction } from "../redux/billSlice";
import { getCommentAction, getRatingAction, selectComment, selectDetail } from "../redux/detailSlice";
import { getMeAction, selectUserData } from "../redux/authSlice";
import axiosClient from "../helpers/axios.helper";


function Detail() {
  const dataa = useSelector(selectUserData)
  const defaultState = {
    customer: {
      name: "",
      identification: "",
      email:dataa.email,
      phoneNumber: "",
      age: 20,
    },
    customerTogether: [],
    _id: "",
    checkinDate: "",
    checkoutDate: "",
    status: 2,
    servicesPerBill: [],
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const commentt=useSelector(selectComment)
  const { id } = useParams();
  const homestayId = useSelector((state) => state.homestayIdReducer);
  console.log(homestayId)
  const filter = useSelector((state) => state.dayReducer);

  /* Root State, for query data from BE */
  const [rootState, setRootState] = useState({
    ...defaultState,
    _id: id,
    checkinDate: filter.checkinDate || new Date(),
    checkoutDate: filter.checkoutDate || new Date(),
  });

  /* State for open Booking form modal */
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  /* State for open Notification modal */
  const [isNotiModalOpen, setIsNotiModalOpen] = useState(false);

  /* State for confirm book homestay */
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    if (isConfirmed) {
      setIsConfirmed(false);
      console.log(rootState)
      toast("Đang chờ...", { type: toast.TYPE.INFO });
      axiosClient({
        method: "POST",
        url: "http://localhost:8000/users/create/billsAuthenticated",
        data: rootState,
      })
        .then(async(response) => {
          console.log(response)
          toast("Thành công", { type: toast.TYPE.SUCCESS })
          // await dispatch(GetBillAction({email:rootState.customer.email}))
          navigate('/billdetail')
          // navigate('/billdetail', { state: { responseData: response.data.billl, data: data } });

        })
        .catch((err) => {
          console.log(err.message);
          toast("Có lỗi xảy ra khi tạo đơn đặt phòng của bạn", {
            type: toast.TYPE.ERROR,
          });
        });
    }
  }, [isConfirmed]);

  /* Query data from BE */
  const [data, setData] = useState([]);
  const [bill, setBill] = useState([]);
  const [pictureList, setPictureList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:8000/homestays/information/${id}`
        );
        console.log(response.content)
        setData(response.content.homestay);
        setBill(response.content.billOfHomestayArray);
        setPictureList(response.content.homestay.photos)


        const discountId = response.content.homestay.discountId;
        if (discountId) {
          const { data: response2 } = await axios.get(
            'http://localhost:8000/admins/discounts/' + discountId
          )
          setDiscount(response2.content.value)
        }

      } catch (error) {
        toast(error.message, { type: toast.TYPE.ERROR });
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log({ userId: localStorage.getItem('UserId'), id })
    dispatch(getRatingAction({ userId: localStorage.getItem('UserId'), id }))
   
});
useEffect(() => {
  if(localStorage.getItem('AccessToken')){
      dispatch(getMeAction())
  }
},[])
useEffect(() => {
  dispatch(getCommentAction({id}))
},[]);

  /* State for display total price user have to pay */
  const [servicePrice, setServicePrice] = useState();

  /* State for Booking card and Booking Form */
  const [totalPrice, setTotalPrice] = useState(0);
  const [countCustomer, setCountCustomer] = useState(0);

  //tính rate trung bình mỗi loại: clean, value, accuracy, service
  let count = 0;
  let cleanRate, valueRate, accuracyRate, serviceRate;
  if (undefined !== data.rates && data.rates.length) {
    count = data.rates.length;
    cleanRate = data.rates.reduce(
      (result, { cleanRate }) => result + cleanRate,
      0
    );
    cleanRate /= count;
    valueRate = data.rates.reduce(
      (result, { valueRate }) => result + valueRate,
      0
    );
    valueRate /= count;
    accuracyRate = data.rates.reduce(
      (result, { accuracyRate }) => result + accuracyRate,
      0
    );
    accuracyRate /= count;
    serviceRate = data.rates.reduce(
      (result, { serviceRate }) => result + serviceRate,
      0
    );
    serviceRate /= count;
  } else {
    count = 0;
    cleanRate = 0;
    valueRate = 0;
    accuracyRate = 0;
    serviceRate = 0;
  }

  return (
    <div>
      <Header className="bg-gray-100"/>
      <div>
        {data.services ? (
          <BookFormModal
            openProp={[isBookingFormOpen, setIsBookingFormOpen]}
            serviceProps={data.services.map((item) => ({ ...item, amount: 0 }))}
            setServicePrice={setServicePrice}
            totalPrice={totalPrice}
            countCustomer={countCustomer}
            rootProps={[rootState, setRootState]}
            setIsConfirmed={setIsConfirmed}
          />
        ) : <div>hihihi</div>}
        <NotiModal
          openProp={[isNotiModalOpen, setIsNotiModalOpen]}
          state={false}
        />
      </div>
      <PictureContainer _id={id} pictureList={pictureList} />

      <div className=" max-w-2/3 mx-auto ">
        <div className="grid grid-cols-5 mt-10 border-b border-gray-300">
          <div className="col-start-1 col-end-4">
            
            <Description
              detail={data}
              className="border-b-2 border-gray-300 pb-8"
            />

            <div className="border-b border-gray-300 pb-8 pt-8">
              <p className="text-2xl font-bold ml-3 mb-3"> Tiện nghi có sẵn </p>
              <div className="grid grid-cols-2">
                {data.amenities && data.amenities.length
                  ? data.amenities.map((item) => (
                    <div className="flex py-1">
                      <AmenitiesAndServices
                        detail={item}
                        className="flex flex-row"
                      />
                    </div>
                  ))
                  : null}
              </div>
            </div>

            <div className="border-b border-gray-300 pb-8 pt-8">
              <p className="text-2xl font-bold ml-3 mb-3">
                {" "}
                Dịch vụ của Homestay{" "}
              </p>
              <div className="grid grid-cols-2">
                {data.generalServices && data.generalServices.length
                  ? data.generalServices.map((item) => (
                    <div className="flex py-1">
                      <AmenitiesAndServices
                        detail={item}
                        className="flex flex-row"
                      />
                    </div>
                  ))
                  : null}
              </div>
            </div>

            <div className="pb-8 pt-8">
              <p className="text-2xl font-bold ml-3 mb-3"> Dịch vụ đặt kèm </p>
              <div className="grid grid-cols-2">
                {data.services && data.services.length
                  ? data.services.map((item) => (
                    <div className="flex py-1">
                      <BoltOutlinedIcon className="text-gray-900 mr-3 mt-1" />
                      <p className="text-lg text-gray-900 flex flex-row">
                        {item.name}
                      </p>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>

          <div className="col-start-4 col-span-2 my-8 ml-10">
            <BookingCard
              rootProps={[rootState, setRootState]}
              formProp={[isBookingFormOpen, setIsBookingFormOpen]}
              homestayPrice={data.price}
              discountProps={[discount, setDiscount]}
              bill={bill}
              servicePriceProps={servicePrice}
              totalPriceProps={[totalPrice, setTotalPrice]}
              countCustomerProps={[countCustomer, setCountCustomer]}
            />
          </div>
        </div>

        <div className="pb-8 pt-8">
          <div className="flex mb-3">
            <p className="flex flex-row text-2xl font-bold ml-3"> Đánh giá </p>
            <p className="flex flex-row text-lg font-medium mt-1 ml-5">
              ({count * 4} đánh giá)
            </p>
          </div>
          <Rates
            cleanRate={cleanRate}
            valueRate={valueRate}
            serviceRate={serviceRate}
            accuracyRate={accuracyRate}
          /> 
          <p className="flex flex-row text-2xl font-bold ml-3 mt-4"> Rating </p>
          <div className="grid grid-cols-2 mt-2">
            <Rating id={data.id} msg={'cleanRate'} />
            <Rating id={data.id} msg={'serviceRate'} />
            <Rating id={data.id} msg={'valueRate'} />
            <Rating id={data.id} msg={'accuracyRate'} />
          </div>

          <p className="flex flex-row text-2xl font-bold ml-3 mt-4"> Comment </p>
          <div className="grid grid-cols-2">{commentt?.map((item) => <Feedback detail={item} />)}</div>
          <Comment id={id}/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Detail;
