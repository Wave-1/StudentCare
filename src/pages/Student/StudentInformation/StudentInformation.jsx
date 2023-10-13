import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentInformation({fid, onClose}){
    const ID = sessionStorage.getItem('ID');
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    const[data, setData] = useState({
        studentID: ID,
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

    });

    const[data2, setData2] = useState({
        id: ID,
        roleID: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
        setData2({
            ...data2,
            [name]: value,
        });
    };

    const updateStudent = async () =>{
        event.preventDefault();
        console.log("update");
        if (!data.studentID || !data.studentName || !data.studentClass ) {
            toast.error("Please fill in teacher information completely !!!");
            return;
        }

        // Xây dựng URL endpoint dựa trên cấu trúc API của bạn
        const apiUrl = `${API_BASE_URL}${API_ROUTES.Student}/${ID}`;
        const newStudentData = {
                studentID: data.studentID,
                studentName: data.studentName,
                birthday: data.birthday,
                studentClass: data.studentClass,
                course: data.course,
                fieldOfStudy: data.fieldOfStudy,
                phoneNumber: data.phoneNumber,
                email: data.email,
                placeOfBirth: data.placeOfBirth,
                permanentResidence: data.permanentResidence,
                yearOfStudy: data.yearOfStudy,
                faculty: data.faculty,
                updatedAt: new Date(),
        };
        const apiUrl2 = `${API_BASE_URL}${API_ROUTES.Loginn}/${ID}`;
        const newLoginData = {
                id: data2.id,
                roleID: '3',
                password: data2.newPassword,
                updatedAt: new Date(),
        };
        if (data2.newPassword && data2.newPassword === data2.confirmPassword) {
            const isOldPassword = await comparePasswords(data2.password, data2.password);
            if (!isOldPassword) {
                toast.error('Mật khẩu cũ không khớp. Cập nhật mật khẩu thất bại.');
                return;
            }
            newStudentData.newPassword = data2.newPassword;
        }

        try{
            const response = await axios.put(apiUrl, newStudentData, {
                headers: API_HEADERS,
            });
            const response2 = await axios.put(apiUrl2, newLoginData, {
                headers: API_HEADERS,
            });
            if(response.status === 200 && response2.status === 200){
                fetchData(); 
                Swal.fire("Appdate Student Successfully !!!", "", "success");
            }else{
                console.error('Failed');
            }
            console.log("update1");
        }catch (error){
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
            console.error('Failed to fetch s data !!!');
          }
        } catch (error) {
          console.error(`Đã xảy ra lỗi khi lấy dữ liệu sv: ${error.message}`);
        }
      };

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}${API_ROUTES.Student}/${ID}`, {
                headers: API_HEADERS
            })
         
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [ID]);


    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };


    const comparePasswords = async (password, hashedPassword) => {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return false;
        }
    };
    return (
        <>
        <form>
        <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">studentID</label>
                <div className="mt-2">
                    <input  type="text"
                            name="studentID"
                            value={data.studentID}   
                            disabled id="studentID" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>
                <div className="sm:col-span-3">
                <label htmlFor="ame" className="block text-sm font-medium leading-6 text-gray-900">Student Name</label>
                <div className="mt-2">
                    <input type="text"
                            name="studentName"
                            id="studentName"
                            value={data.studentName}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                    <input type=""
                        name="email"
                        value={data?.email}
                        onChange={handleChange}
                        autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="sm:col-span-3">
                <label htmlFor="fieldOfStudy" className="block text-sm font-medium leading-6 text-gray-900">Field Of Study</label>
                <div className="mt-2">
                    <select as="select"
                            name="fieldOfStudy"
                            value={data.fieldOfStudy}
                            onChange={handleChange}
                            autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
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
                            <option value="Khác">khác</option>
                    </select>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Date Of Birth</label>
                <div className="mt-2">
                    <input  type="date"
                            name="birthday"
                            value={formatDateForInput(data?.birthday)}
                            onChange={handleChange}
                            autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="studentClass" className="block text-sm font-medium leading-6 text-gray-900">Student Class</label>
                <div className="mt-2">
                    <input type="text"
                            name="studentClass"
                            value={data?.studentClass}
                            onChange={handleChange}
                            autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">Course</label>
                <div className="mt-2">
                    <input type="text"
                            name="course"
                            value={data?.course}
                            onChange={handleChange}
                            autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                <div className="mt-2">
                    <input type="text"
                        name="phoneNumber"
                        value={data?.phoneNumber}
                        onChange={handleChange}
                        autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="placeOfBirth" className="block text-sm font-medium leading-6 text-gray-900">Place Of Birth</label>
                <div className="mt-2">
                    <input type="text"
                        name="placeOfBirth"
                        value={data?.placeOfBirth}
                        onChange={handleChange}
                        autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="permanentResidence" className="block text-sm font-medium leading-6 text-gray-900">Permanent Residence</label>
                <div className="mt-2">
                    <input  type="text"
                        name="permanentResidence"
                        value={data?.permanentResidence}
                        onChange={handleChange}
                        autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="yearOfStudy" className="block text-sm font-medium leading-6 text-gray-900">Year Of Study</label>
                <div className="mt-2">
                    <input  type="text"
                        name="yearOfStudy"
                        value={data?.yearOfStudy}
                        onChange={handleChange}
                        autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="faculty" className="block text-sm font-medium leading-6 text-gray-900">Faculty</label>
                <div className="mt-2">
                    <input  type="text"
                        name="faculty"
                        value={data?.faculty}
                        onChange={handleChange}
                        autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>
{/* 
                <div className="col-span-3">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="mt-2">
                    <input type="password"
                        name="oldPassword"
                        onChange={handleChange}
                         autoComplete="" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div className="col-span-3">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                <div className="mt-2">
                    <input type="password"
                            name="newPassword"
                            onChange={handleChange}
                            autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div> */}
            </div>
            </div>

        </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                onClick={updateStudent}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Save
                </button>
            </div>
        </form>
        </>
    );
}  
