import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function FormCertificates() {
  const ID = sessionStorage.getItem('ID');
  console.log(ID);
  const [certificatesData, setCertificatesData] = useState({
    studentID: ID,
    kind:'',
    commit:'',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCertificatesData({
        ...certificatesData,
        [name]: value,
    });
};
const createCertificates = async () => {
    
  // Kiểm tra dữ liệu trước khi gửi yêu cầu
  if ( !certificatesData.kind || !certificatesData.commit) {
    toast.error("Please fill in ..completely !!!");
    return;
}

const apiUrl = `${API_BASE_URL}${API_ROUTES.Certificates}`;
  const newCertificatesData = {
      studentID: certificatesData.studentID,
      kind: certificatesData.kind,
      commit: certificatesData.commit,
      createDate: new Date(),
      updateDate: new Date(),
  };
  try {
    const response = await axios.post(apiUrl, newCertificatesData, {
        headers: API_HEADERS,
    });
    if (response.status === 200) {
        // Thêm  thành công, cập nhật lại trạng thái của biểu mẫu
        setCertificatesData({
            studentID: '',
            kind: '',
            commit: '',
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


  return (
    <form>
      <div className="space-y-12">

          <div className="mt-10 space-y-10">
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              WHAT IS THIS CERTIFICATE ISSUED TO THE LITIGANT FOR?
              </label>
              <div className="mt-2">
                <select
                  id="kind"
                  name="kind"
                  autoComplete="kind-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={certificatesData.kind}
                  onChange={handleChange}
                >
                  <option></option>
                  <option value="TẠM HOÃN NGHĨA VỤ QUÂN SỰ">TẠM HOÃN NGHĨA VỤ QUÂN SỰ</option>
                  <option value="BỔ SUNG HỒ SƠ">BỔ SUNG HỒ SƠ</option>
                </select>
              </div>
            </div>
        </div>
          <div className="mt-1 text-sm leading-6 text-gray-600">
            TÔI XIN CAM KẾT:
            <p>- Các thông tin trên là hoàn toàn chính xác.</p>
            <p>- Tôi đã đăng ký các môn của học kỳ này và đóng đủ học phí (học phí của HK hiện tại và học phí nợ các HK trước (nếu có)) trước khi điền link đăng ký giấy xác nhận sinh viên. </p>
            <p>- Tôi hiểu nếu còn nợ học phí thì sẽ không được cấp giấy xác nhận sinh viên, tôi phải đóng đủ học phí và điền lại link hoặc liên hệ trực tiếp phòng đào tạo để cập nhật tình hình học phí. </p>
            <p>- Tôi hiểu thời gian để được cấp xác nhận sinh viên, kể từ khi tôi điền link và hoàn tất đầy đủ học phí là 4-7 ngày. Những trường hợp ngoại lệ, tôi cần liên hệ trực tiếp Phòng công tác học sinh sinh viên (gặp Cô Huyền Thanh) để tư vấn. </p>
            <p>- Tôi đã đọc và đồng ý với các quy định của phòng công tác HSSV, tôi không có thắc mắc gì khi điền link đăng ký này. </p>
          </div>
          <fieldset>
          <div className="mt-6 space-y-6">
  <div className="flex items-center gap-x-3">
    <input
      id="Commit"
      name="commit"
      type="radio"
      value="ĐÃ ĐỌC VÀ CAM KẾT"
      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      onChange={handleChange}
      checked={certificatesData.commit === "ĐÃ ĐỌC VÀ CAM KẾT"}
    />
    <label htmlFor="Commit" className="block text-sm font-medium leading-6 text-gray-900">READ AND COMMITTED</label>
  </div>
</div>

        </fieldset>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          CANCEL
        </button>
        <button
          type="button"
          onClick={createCertificates}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          SAVE
        </button>
      </div>
      </div>

      
    </form>
  
  )
}