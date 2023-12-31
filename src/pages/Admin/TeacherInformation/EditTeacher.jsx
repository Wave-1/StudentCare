import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function EditTeacher({ fid, onClose }) {
  const [rows, setRows] = useState([]);
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
        onClose();
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
      <div className="container mx-auto p-4 space-y-12">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-4xl font-semibold leading-3 text-gray-900 text-center">Update Teacher</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Teacher ID
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="teacherID"
                    id="teacherID"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={teacherData.teacherID}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Teacher Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="teacherName"
                    id="teacherName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={teacherData.teacherName}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Problem ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="studentClass"
                    id="studentClass"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={teacherData.problemID}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Role ID
                </label>
                <div className="mt-2">
                  <input
                    id="roleID"
                    name="RoleID"
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={teacherData.roleID}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={updateTeacher}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
