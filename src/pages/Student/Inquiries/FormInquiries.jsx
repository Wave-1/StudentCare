import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function FormInquiries() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [rows, setRows] = useState([]);
  const ID = sessionStorage.getItem('ID');
  const [inquiriesData, setInquiriesData] = useState({
    studentID: ID,
    problemName:'',
    detail:'',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInquiriesData({
        ...inquiriesData,
        [name]: value,
    });
};

  const createInquiries = async () => {
    
    // Kiểm tra dữ liệu trước khi gửi yêu cầu
    if (!inquiriesData.studentID || !inquiriesData.problemName) {
      toast.error("Please fill in ..completely !!!");
      return;
  }
  
  // Xây dựng URL endpoint dựa trên cấu trúc API của bạn
  const apiUrl = `${API_BASE_URL}${API_ROUTES.Inquiries}`;
  const newInquiriesData = {
      studentID: inquiriesData.studentID,
      problemName: inquiriesData.problemName,
      detail: inquiriesData.detail,
      createDate: new Date(),
      updateDate: new Date(),
  };
  try {
    const response = await axios.post(apiUrl, newInquiriesData, {
        headers: API_HEADERS,
    });
    if (response.status === 200) {
        // Thêm  thành công, cập nhật lại trạng thái của biểu mẫu
        setInquiriesData({
            studentID: '',
            problemName: '',
            detail: '',
        });
        Swal.fire("Add  Successfully !!!", "", "success");
        console.log(response.data);
    } else {
        // Xử lý lỗi khi thêm giáo viên thất bại
        console.error('Failed to.. !!!');
    }
    } catch (error) {
        toast.error(`Đã xảy ra lỗi: ${error.message}`);
        console.error('Đã xảy ra lỗi:', error);
    }
    
  }
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   fetch('../../../../ckfinder/core/php/connector.php', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Lưu đường dẫn hình ảnh từ response vào imageUrl
  //       setImageUrl(data.imageUrl);
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading image:', error);
  //     });
  // };
    //   const fetchData = async () => {
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Inquiries}`, {
    //             headers: API_HEADERS,
    //         });
    //         if (response.status === 200) {
    //             setRows(response.data);
                
    //         } else {
    //             console.error('Failed to fetch .. data !!!');
    //         }
    //     } catch (error) {
    //         console.error(`Đã xảy ra lỗi khi lấy dữ liệu : ${error.message}`);
    //     }
    // };
  return (
    <form>
      <div className="space-y-12">

          <div className="mt-10 space-y-10">
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              STUDENT SUPPORT ISSUES
              </label>
              <div className="mt-2">
                <select
                  id="problemName"
                  name="problemName"
                  autoComplete="problemName-name"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={inquiriesData.problemName}
                  onChange={handleChange}
                >
                  <option></option>
                  <option value="HỦY MÔN- ĐĂNG KÝ MÔN- XIN BẢNG ĐIỂM-GCN">HỦY MÔN- ĐĂNG KÝ MÔN- XIN BẢNG ĐIỂM-GCN (SV LIÊN HỆ TRỰC TIẾP PDT ĐỂ ĐIỀN ĐƠN)</option>
                  <option value="CẬP NHẬT ĐIỂM SỐ">CẬP NHẬT ĐIỂM SỐ</option>
                  <option value="CHUYỂN ĐIỂM">CHUYỂN ĐIỂM (Nếu SV cần chuyển điểm cần nộp đơn xin chuyển điểm + bảng điểm trường cũ photo công chứng tại phòng đạo tạo để được giải quyết)</option>
                  <option value="CẬP NHẬT ĐIỂM SỐ">CẬP NHẬT ĐIỂM SỐ</option>
                  <option value="ĐĂNG KÝ HỌC LẠI-THI LẠI">ĐĂNG KÝ HỌC LẠI-THI LẠI</option>
                  <option value="CÁC VẤN ĐỀ LIÊN QUAN HỌC PHÍ">CÁC VẤN ĐỀ LIÊN QUAN HỌC PHÍ (trừ cập nhật HP Đã đóng).  SV chỉ được rút Học phí/ lệ phí dư  khi hoàn tất chương trình học và nhận bằng tốt nghiệp.</option>
                  <option value="VẤN ĐỀ KHÁC">VẤN ĐỀ KHÁC</option> 
                </select>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              STUDENTS PRESENT DETAILS
              </label>
              <div className="mt-2">
                <textarea
                  id="detail"
                  name="detail"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
                  onChange={handleChange}
                  value={inquiriesData.detail}
                />
              </div>
            </div>
            
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          CANCEL
        </button>
        <button
          type="button" // Để tránh gửi biểu mẫu và làm mới trang, bạn có thể sử dụng type="button"
          onClick={createInquiries}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          SAVE
        </button>
      </div>
    </form>
  
  )
}