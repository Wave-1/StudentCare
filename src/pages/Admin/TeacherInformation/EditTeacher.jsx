import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppStore } from '../../../appStore';

export default function EditTeacher({ fid, closeEvent }) {
  const setRows = useAppStore((state) => state.setRows);
  const [teacherData, setTeacherData] = useState({
    teacherID: '',
    teacherName: '',
    problemID: '',
    roleID: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const updateTeacher = async () => {
    // Kiểm tra dữ liệu trước khi gửi yêu cầu
    if (!teacherData.teacherID || !teacherData.teacherName || !teacherData.problemID || !teacherData.roleID) {
      toast.error("Please fill in teacher information completely !!!");
      return;
    }
    // Kiểm tra giá trị teacherID có hợp lệ không
    if (!/^\d+$/.test(teacherData.teacherID)) {
      toast.error("Teacher ID must be a valid integer.");
      return;
    }

    // Xây dựng URL endpoint dựa trên cấu trúc API của bạn
    const apiUrl = `${API_BASE_URL}${API_ROUTES.Teacher}/${fid.teacherID}`; // Đã sửa URL

    const newTeacherData = {
      teacherID: teacherData.teacherID,
      teacherName: teacherData.teacherName,
      problemID: teacherData.problemID,
      roleID: teacherData.roleID,
      createDate: new Date(),
      updateDate: new Date(),
    };

    try {
      const response = await axios.put(apiUrl, newTeacherData, {
        headers: API_HEADERS,
      });
      if (response.status === 200) {
        // Cập nhật giáo viên thành công, cập nhật lại danh sách giáo viên
        fetchData(); // Gọi hàm fetchData để cập nhật danh sách giáo viên
        closeEvent();
        Swal.fire("Update Teacher Successfully !!!", "", "success");
      } else {
        // Xử lý lỗi khi cập nhật giáo viên thất bại
        console.error('Failed to update teacher !!!');
      }
    } catch (error) {
      toast.error(`Đã xảy ra lỗi: ${error.message}`);
      console.error('Đã xảy ra lỗi:', error);
    }
  };

  // Thực hiện yêu cầu GET dữ liệu từ API và cập nhật dữ liệu trong setRows
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Teacher}`, {
        headers: API_HEADERS,
      });
      if (response.status === 200) {
        setRows(response.data);
      } else {
        console.error('Failed to fetch teacher data !!!');
      }
    } catch (error) {
      console.error(`Đã xảy ra lỗi khi lấy dữ liệu giáo viên: ${error.message}`);
    }
  };

  useEffect(() => {
    // Khởi tạo giá trị ban đầu cho form sửa đổi
    setTeacherData({
      teacherID: fid.teacherID,
      teacherName: fid.teacherName,
      problemID: fid.problemID,
      roleID: fid.roleID,
    });
  }, [fid]);

  return (
    <>
      <div className="m-2">
        <h2 className="text-2xl text-center">Update Teacher</h2>
        <div className="h-4"></div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p>Teacher ID:</p>
            <input
              type="number"
              className="w-full p-2 border rounded"
              id="teacherID"
              placeholder="Teacher ID"
              name="teacherID"
              value={teacherData.teacherID}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Teacher Name:</p>
            <input
              type="text"
              className="w-full p-2 border rounded"
              id="teacherName"
              placeholder="Teacher Name"
              name="teacherName"
              value={teacherData.teacherName}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Problem ID:</p>
            <input
              type="text"
              className="w-full p-2 border rounded"
              id="problemID"
              placeholder="Problem ID"
              name="problemID"
              value={teacherData.problemID}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Role ID:</p>
            <input
              type="text"
              className="w-full p-2 border rounded"
              id="roleID"
              placeholder="Role ID"
              name="roleID"
              value={teacherData.roleID}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              className="w-24 p-2 bg-blue-500
                             text-white rounded
                             hover:bg-violet-600
                             "
              onClick={updateTeacher}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
