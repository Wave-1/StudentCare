import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditResultsAnswered({
    data, // Dữ liệu hàng bạn muốn chỉnh sửa
    onClose, // Hàm để đóng biểu mẫu chỉnh sửa
    onUpdate, // Hàm để thông báo cho component cha khi có sự cập nhật
    fid
}) {
    const teacherID = sessionStorage.getItem('ID');
    const { resultsAnsweredID } = useParams();
    const [resultsAnsweredData, setResultsAnsweredData] = useState({
        resultsAnsweredID: '',
        inquiriesID: '',
        studentID: '',
        teacherID: '',
        dateOfReception: '',
        processingResults: '',
        condition: '',
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setResultsAnsweredData({
            ...resultsAnsweredData,
            [name]: value,
        });
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Xử lý trường hợp ngày rỗng
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    // Sử dụng useEffect để tải dữ liệu khi component được tạo
    useEffect(() => {
        // Thực hiện tải dữ liệu từ API hoặc nguồn dữ liệu khác ở đây và cập nhật state resultsAnsweredData
        // Ví dụ:
        axios
            .get(`${API_BASE_URL}${API_ROUTES.ResultsAnswered}/results/${fid.resultsAnsweredID}`, {
                headers: API_HEADERS,
            })
            .then((response) => {
                const responseData = response.data;
                // Đảm bảo cập nhật dữ liệu cần thiết từ dữ liệu tải về
                setResultsAnsweredData(responseData);
                // Gọi hàm để lấy tên sinh viên dựa trên studentID
                // getStudentName(responseData.studentID);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [resultsAnsweredID]);


    const handleSave = async () => {
        // Tạo một đối tượng để lưu trữ các trường cần cập nhật
        const updatedData = {
            updateDate: new Date(),
            teacherID: teacherID
        };

        // Kiểm tra và thêm các trường cần cập nhật vào đối tượng updatedData
        if (resultsAnsweredData.teacherID !== null) {
            updatedData.teacherID = resultsAnsweredData.teacherID;
        }

        if (resultsAnsweredData.dateOfReception !== null) {
            updatedData.dateOfReception = resultsAnsweredData.dateOfReception;
        }

        if (resultsAnsweredData.processingResults !== null) {
            updatedData.processingResults = resultsAnsweredData.processingResults;
        }

        if (resultsAnsweredData.condition !== null) {
            updatedData.condition = resultsAnsweredData.condition;
        }

        // Đảm bảo inquiriesID và studentID được giữ nguyên
        updatedData.inquiriesID = resultsAnsweredData.inquiriesID;
        updatedData.studentID = resultsAnsweredData.studentID; // Sử dụng studentID từ state

        // Kiểm tra xem có trường nào cần cập nhật không
        if (Object.keys(updatedData).length > 2) {
            // Kiểm tra xem resultsAnsweredID đã được định nghĩa chưa
            if (resultsAnsweredData.resultsAnsweredID) {
                const apiUrl = `${API_BASE_URL}${API_ROUTES.ResultsAnswered}/${resultsAnsweredData.resultsAnsweredID}`;

                try {
                    const response = await axios.put(apiUrl, updatedData, {
                        headers: API_HEADERS,
                    });

                    if (response.status === 200) {
                        // Cập nhật thành công
                        // onUpdate();
                        Swal.fire("Answer  Successfully !!!", "", "success");
                        onClose();
                    } else {
                        Swal.fire("Answer Failed !!!", "", "error");
                        onClose();
                    }
                } catch (error) {
                    console.error('Có lỗi khi cập nhật dữ liệu:', error);
                }
            } else {
                console.error('resultsAnsweredID is undefined.');
            }
        } else {
            console.log('No fields to update.'); // Xử lý trường hợp không có trường nào được cập nhật
        }
    };

    return (
        <>
            <div className="overflow-y-auto h-[calc(100vh-64px)]">
                <div className="container mx-auto p-4 space-y-12">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-4xl font-semibold leading-3 text-gray-900 text-center">Answer</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Results Answered ID
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="resultsAnsweredID"
                                            id="resultsAnsweredID"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={resultsAnsweredData.resultsAnsweredID}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Inquiries Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="inquiriesID"
                                            id="inquiriesID"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={resultsAnsweredData.inquiriesID}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Student Name
                                    </label>
                                    <div className="mt-2">
                                        {/* Hiển thị tên sinh viên từ state */}
                                        <input
                                            type="text"
                                            name="studentID"
                                            id="studentID"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={resultsAnsweredData.studentID}
                                            readOnly
                                        />
                                    </div>
                                </div>
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
                                            value={teacherID}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Date Of Reception
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="dateOfReception"
                                            id="dateOfReception"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formatDateForInput(resultsAnsweredData.dateOfReception)}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Processing Results
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            type="text"
                                            name="processingResults"
                                            id="processingResults"
                                            rows={6}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
                                            value={resultsAnsweredData.processingResults || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Condition
                                    </label>
                                    <div className="mt-2">
                                    <select
                                            id="condition"
                                            name="condition"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={resultsAnsweredData.condition || ''}
                                        >
                                            <option value="">---Select---</option>
                                            <option value='Confirmed'>Confirmed</option>
                                            <option value='Pending'>Pending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            onClick={handleSave}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
