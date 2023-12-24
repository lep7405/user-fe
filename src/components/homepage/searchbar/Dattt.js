import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatetimeInput(props) {
  const [data, setData] = props.dataProps;
  const [fromFocus, setFromFocus] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hidden,setHidden]=useState("hidden")
  const handleDateChange = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    setData((prevData) => ({
      ...prevData,
      to: {
        day,
        month,
        year,
      },
    }))

    setSelectedDate(date); // Lưu giữ giá trị ngày đã chọn
  };

  const handleButtonClick = () => {
    setShowDatePicker(!showDatePicker); 
    setHidden("")
    // Hiển thị DatePicker khi nhấn vào nút "Nhận phòng"
  }; 
  const minDate = data.from // Sử dụng giá trị `to` từ `data` làm minDate
  ? new Date(data.from.year, data.from.month - 1, data.from.day + 1)
  : new Date();

  return (
    <>
      <div className="flex h-full flex-col justify-center items-center">
        <button onClick={handleButtonClick} className="font-bold ">Ngày trả phòng</button>
        {/* <h1>{selectedDate ? selectedDate.toDateString() : ""}</h1> */}
       
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            onFocus={() => setFromFocus(true)}
            onBlur={() => setFromFocus(false)}
            className={`bg-white-500 text-center`}
            minDate={minDate}
            placeholderText="Trả"
          />
      </div>
    </>
  );
}

export default DatetimeInput;