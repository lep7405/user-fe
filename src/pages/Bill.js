import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectUserData } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Bill = ({ bill }) => {
  const [HomeData, setHomeData] = useState([])
  const [service, setService] = useState([])
  const Userdata = useSelector(selectUserData)
  const navigate=useNavigate()
  console.log(Userdata)
  console.log('bro')
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('1')
        const { data: response } = await axios.get(
          `http://localhost:8000/homestays/information/${bill.homestay}`
        );
        console.log('2')
        console.log(response.content)
        setHomeData(response.content.homestay);
        setService(response.content.homestay.services)
      } catch (error) {
        toast(error.message, { type: toast.TYPE.ERROR });
      }
    };
    fetchData();
  }, []);
  useEffect(()=>{
    if(!Userdata.email){
      navigate('/')
    }
  })
  console.log(bill)
  return (
    <div className='bg-gray-100 mt-2 flex justify-around items-center h-full w-full py-16 rounded'>
      <div className='flex flex-col gap-4 font-semibold text-lg'>
        <p className=''>
          Name : {bill.customer.name}
        </p>
        <p>
          Email : {bill.customer.email}
        </p>
        <p>
          Số người : {1+bill.customerTogether.length}
        </p>
        <p>
          Ngày đặt: {new Date(bill.checkinDate).toLocaleDateString()}
        </p>
        <p>
          Ngày trả phòng : {new Date(bill.checkoutDate).toLocaleDateString()}
        </p>
        <p>Tổng giá : {bill.price} VND</p>
        <p>
          Tên Homestay:{HomeData.name}
        </p>
        <p>
          Địa chỉ Homestay:{HomeData.address}
        </p>
        <p>
          Giá : {HomeData.price} VND/1 ngày
        </p>
        {
          bill.servicesPerBill.map((item) => {
            const Service = service.find(serviceItem => serviceItem._id === item.services);

            return (
              <div key={item.services} className='flex justify-between items-center'>
                <p>Dịch vụ: {Service ? Service.name : "Không tìm thấy"}</p>
                <p>Số lượng: {item.count}</p>
              </div>
            );
          })
        }


      </div>
      {HomeData && HomeData.photos && HomeData.photos.length > 0 && (

        <Link to={`/detail/${HomeData._id}`} className="w-1/2 h-1/2">
          <img
            src={`http://localhost:8000${HomeData.photos[0].url}`}
            className="w-full h-full shadow-xl rounded-2xl"
            alt="Homestay"
          />
        </Link>

      )}

    </div>
  )
}

export default Bill