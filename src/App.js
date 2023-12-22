// App.js
import React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Homepage from "./pages/Homepage";
import Homestays from "./pages/Homestays";
import Register from "./components/homepage/Register";
import Login from "./components/homepage/Login";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import BillDetail from "./pages/BillDetail";
library.add(faStar);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homestay" element={<Homestays />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/billdetail' element={<BillDetail />} />
      </Routes>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        limit={5}
        style={{width: "24rem"}}
      />
    </div>
  );
}

export default App;
