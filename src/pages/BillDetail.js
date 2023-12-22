import React, { useEffect, useState } from 'react'
import Header from '../components/Shared/Header'
import Footer from '../components/Shared/Footer'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetBillAction, selectBill } from '../redux/billSlice';
import Bill from './Bill';
import { selectUserData } from '../redux/authSlice';
import axiosClient from '../helpers/axios.helper';
import { Link } from 'react-router-dom';

const BillDetail = () => {
  // const location = useLocation();
  // const responseData = location.state?.responseData;
  // const data = location.state?.data;
  // console.log(responseData,data)
  // function convertISOToDateString(isoString) {
  //   const parts = isoString.split("T")[0].split("-");
  //   return parts.join("-");
  // }
  const Userdata = useSelector(selectUserData)
  console.log(Userdata)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('http://localhost:8000/users/get/bills');
        console.log(response.data.content)
        setData(response.data.content)
        console.log(data)
      }
      catch (error) {
        console.error(error.message);
      }
    }
    fetchData()


  }, [])
  
  return (
    //tạo thêm 1 cái trang all order nữa
    <div>
      <Header />
      <div className='max-w-3/4 m-auto '>
        <p className='text-center text-3xl'>All Bills</p>
      
       {
          data?.map((bill) => {
            return (
              <div>
                <Bill bill={bill} />
              </div>
            )
          })
        }
      
        
      </div>
      <Footer />
    </div>
  )
}

export default BillDetail