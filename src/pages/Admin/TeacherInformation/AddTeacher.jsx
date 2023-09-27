import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddTeacher({ onClose }) {
    // const [rows, setRows] = useState([]);
    const [problems, setProblems] = useState([]);

    const [teacherData, setTeacherData] = useState({
        teacherID: '',
        teacherName: '',
        problemID: '',
        roleID: '2',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTeacherData({
            ...teacherData,
            [name]: value,
        });
    };

    const createTeacher = async () => {
        // Kiểm tra dữ liệu trước khi gửi yêu cầu
        if (!teacherData.teacherID || !teacherData.teacherName || !teacherData.problemID || !teacherData.roleID) {
            toast.error("Please fill in teacher information completely !!!");
            return;
        }

        // Xây dựng URL endpoint dựa trên cấu trúc API của bạn
        const apiUrl = `${API_BASE_URL}${API_ROUTES.Teacher}`;
        const newTeacherData = {
            teacherID: teacherData.teacherID,
            teacherName: teacherData.teacherName,
            problemID: teacherData.problemID,
            roleID: teacherData.roleID,
            createDate: new Date(),
            updateDate: new Date(),
        };

        try {
            const response = await axios.post(apiUrl, newTeacherData, {
                headers: API_HEADERS,
            });
            if (response.status === 200) {
                // Thêm giáo viên thành công, cập nhật lại trạng thái của biểu mẫu
                setTeacherData({
                    teacherID: '',
                    teacherName: '',
                    problemID: '',
                    roleID: '',
                });
                onClose();
                Swal.fire("Add Teacher Successfully !!!", "", "success");
            } else {
                // Xử lý lỗi khi thêm giáo viên thất bại
                console.error('Failed to create teacher !!!');
            }
        } catch (error) {
            toast.error(`Đã xảy ra lỗi: ${error.message}`);
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    // Thực hiện yêu cầu GET dữ liệu từ API và cập nhật dữ liệu trong setRows
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Problem}`, {
                    headers: API_HEADERS,
                });
                if (response.status === 200) {
                    setProblems(response.data);
                } else {
                    console.error('Failed to fetch teacher data !!!');
                }
            } catch (error) {
                console.error(`Đã xảy ra lỗi khi lấy dữ liệu giáo viên: ${error.message}`);
            }
        };
        fetchProblems();
    }, []);

    return (
        <>
            <div className="container mx-auto p-4 space-y-12">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-4xl font-semibold leading-3 text-gray-900 text-center">Add Teacher</h2>
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
                                {/* <select
                                    className="w-full p-2 border rounded"
                                    id="problemID"
                                    name="problemID"
                                    value={teacherData.problemID}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a problem</option>
                                    {problems.map((problem) => (
                                        <option key={problem.ProblemID} value={problem.ProblemID}>
                                            {problem.problemName}
                                        </option>
                                    ))}

                                </select> */}
                                <div className="mt-2">
                                    <input
                                        id="problemID"
                                        name="problemID"
                                        type="number"
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
                                        name="roleID"
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
                        onClick={createTeacher}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
