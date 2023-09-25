import React, { useState } from 'react';
import { API_BASE_URL, API_HEADERS, API_ROUTES } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { useAppStore } from '../../../appStore';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';

export default function AddStudent({ fid, onClose }) {

    const setRows = useAppStore((state) => state.setRows);
    const [studentData, setStudentData] = useState({
        studentID: '',
        studentName: '',
        birthday: '',
        studentClass: '',
        course: '',
        fieldOfStudy: '',
        phoneNumber: '',
        email: '',
        placeOfBirth: '',
        permanentResidence: '',
        yearOfStudy: '',
        faculty: '',
        roleID: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudentData({
            ...studentData,
            [name]: value,
        });
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const createStudent = async () => {
        if (!studentData.studentID || !studentData.studentName || !studentData.birthday || !studentData.studentClass ||
            !studentData.course || !studentData.fieldOfStudy || !studentData.phoneNumber || !studentData.email ||
            !studentData.placeOfBirth || !studentData.permanentResidence || !studentData.yearOfStudy ||
            !studentData.faculty || !studentData.roleID) {
            toast.error('"Please fill in student information completely !!!"')
            return;
        }
        //Xây dựng API
        const apiUrl = `${API_BASE_URL}${API_ROUTES.Student}/${fid.studentID}`;
        const newStudentData = {
            studentID: studentData.studentID,
            studentName: studentData.studentName,
            birthday: studentData.birthday,
            studentClass: studentData.studentClass,
            course: studentData.course,
            fieldOfStudy: studentData.fieldOfStudy,
            phoneNumber: studentData.phoneNumber,
            email: studentData.email,
            placeOfBirth: studentData.placeOfBirth,
            permanentResidence: studentData.permanentResidence,
            yearOfStudy: studentData.yearOfStudy,
            faculty: studentData.faculty,
            roleID: studentData.roleID,
            createDate: new Date(),
            updateDate: new Date(),
        };
        try {
            const response = await axios.put(apiUrl, newStudentData, {
                headers: API_HEADERS
            });
            if (response.status === 200) {
                fetchData();
                onClose();
                Swal.fire("Update Student Successfully !!!", "", "success");

            }
        } catch (error) {
            toast.error(`Đã xảy ra lỗi: ${error.message}`);
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Student}`, {
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
        setStudentData({
            studentID: fid.studentID,
            studentName: fid.studentName,
            birthday: fid.birthday,
            studentClass: fid.studentClass,
            course: fid.course,
            fieldOfStudy: fid.fieldOfStudy,
            phoneNumber: fid.phoneNumber,
            email: fid.email,
            placeOfBirth: fid.placeOfBirth,
            permanentResidence: fid.permanentResidence,
            yearOfStudy: fid.yearOfStudy,
            faculty: fid.faculty,
            roleID: fid.roleID,
        });
    }, [fid]);

    return (
        <>
            <div className="overflow-y-auto h-[calc(100vh-64px)]">
                <div className="container mx-auto p-4 space-y-12">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-4xl font-semibold leading-3 text-gray-900 text-center">Add Student</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Student ID
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="studentID"
                                            id="studentID"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.studentID}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Student Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="studentName"
                                            id="studentName"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.studentName}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Birthday
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="birthday"
                                            id="birthday"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={formatDateForInput(studentData.birthday)}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Student Class
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="studentClass"
                                            id="studentClass"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.studentClass}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Course
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="course"
                                            name="course"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.course}
                                        >
                                            <option value="">---Select---</option>
                                            <option value='Khóa 14'>Khóa 14</option>
                                            <option value='Khóa 15'>Khóa 15</option>
                                            <option value='Khóa 16'>Khóa 16</option>
                                            <option value='Khóa 17'>Khóa 17</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Field Of Study
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="fieldOfStudy"
                                            name="fieldOfStudy"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            value={studentData.fieldOfStudy}
                                            onChange={handleChange}
                                        >
                                            <option value="">---Select---</option>
                                            <option value="Quản trị Kinh Doanh">Quản trị Kinh Doanh</option>
                                            <option value="Quản trị Marketing">Quản trị Marketing</option>
                                            <option value="Quản trị Văn Phòng">Quản trị Văn Phòng</option>
                                            <option value="Kế toán">Kế toán</option>
                                            <option value="Tài chính - Ngân hàng">Tài chính - Ngân hàng</option>
                                            <option value="Logistics">Logistics</option>
                                            <option value="Luật">Luật</option>
                                            <option value="Quản trị Nhà hàng - Khách sạn">Quản trị Nhà hàng - Khách sạn</option>
                                            <option value="Quản trị DV Du lịch lữ hành">Quản trị DV Du lịch lữ hành</option>
                                            <option value="Bếp">Bếp</option>
                                            <option value="Tiếng Anh">Tiếng Anh</option>
                                            <option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
                                            <option value="Tin học ứng dụng">Tin học ứng dụng</option>
                                            <option value="Truyền thông & Mạng máy tính">Truyền thông & Mạng máy tính</option>
                                            <option value="Điều Dưỡng">Điều Dưỡng</option>
                                            <option value="Hộ Sinh">Hộ Sinh</option>
                                            <option value="Xét Nghiệm Y Học">Xét Nghiệm Y Học</option>
                                            <option value="Chăm sóc sắc đẹp">Chăm sóc sắc đẹp</option>
                                            <option value="CNKT Ô Tô">CNKT Ô Tô</option>
                                            <option value="CNKT Cơ Khí">CNKT Cơ Khí</option>
                                            <option value="CNKT Điện - Điện Tử">CNKT Điện - Điện Tử</option>
                                            <option value="CNKT Xây Dựng">CNKT Xây Dựng</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        PhoneNumber
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="number"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.phoneNumber}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.email}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Place Of Birth
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="placeOfBirth"
                                            name="placeOfBirth"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.placeOfBirth}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Permanent Residence
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="permanentResidence"
                                            name="permanentResidence"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.permanentResidence}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Year Of Study
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="yearOfStudy"
                                            name="yearOfStudy"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.yearOfStudy}
                                        >
                                            <option value="">---Select---</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Faculty
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="faculty"
                                            name="faculty"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.faculty}
                                        >
                                            <option value="">---Select---</option>
                                            <option value="Kinh Tế">Kinh Tế</option>
                                            <option value="Dịch Vụ">Dịch Vụ</option>
                                            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                                            <option value="Chăm sóc sức khỏe">Chăm sóc sức khỏe</option>
                                            <option value="Chăm sóc sắc đẹp">Chăm sóc sắc đẹp</option>
                                            <option value="Công nghệ kỹ thuật">Công nghệ kỹ thuật</option>
                                            <option value="Ngoại Ngữ">Ngoại Ngữ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Role ID
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="roleID"
                                            id="roleID"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={studentData.roleID}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            onClick={createStudent}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

