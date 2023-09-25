import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
//import AppointmentSchedule from '../pages/Admin/AppointmentSchedule/AppointmentSchedule';
import Inquiries from '../pages/Student/Inquiries/Inquiries';
import FormInquiries from '../pages/Student/Inquiries/FormInquiries';
import Certificates from '../pages/Student/Certificates/Certificates';
import FormCertificates from '../pages/Student/Certificates/FormCertificates';
//import Inquiries from '../pages/Admin/Inquiries/Inquiries';
import Problem from '../pages/Admin/Problem/Problem';
import ResultsAnswered from '../pages/Admin/ResultsAnswered/ResultsAnswered';
import Student from '../pages/Admin/StudentInformation/Student';
import StudentList from '../pages/Admin/StudentInformation/StudentList';
import AddStudent from '../pages/Admin/StudentInformation/AddStudent';
import EditStudent from '../pages/Admin/StudentInformation/EditStudent';
import Teacher from '../pages/Admin/TeacherInformation/Teacher';
import AddTeacher from '../pages/Admin/TeacherInformation/AddTeacher';
import EditTeacher from '../pages/Admin/TeacherInformation/EditTeacher';
import TeacherList from '../pages/Admin/TeacherInformation/TeacherList';
import WorkSchedule from '../pages/Admin/WorkSchedule/WorkSchedule';
import FormWorkSchedule from '../pages/Admin/WorkSchedule/FormWorkSchedule';



export const AdminRoutes = () => (
    <Routes>
        <Route path="/" element={<Home/>}>
            <Route path='Certificates' element={<Certificates/>}/>
            <Route path='Inquiries' element={<Inquiries/>}/>
            <Route path='Problem' element={<Problem/>}/>
            <Route path='ResultsAnswered' element={<ResultsAnswered/>}/>
            <Route path='StudentInformation/AddStudent' element={<AddStudent/>}/>
            <Route path='StudentInformation/EditStudent' element={<EditStudent/>}/>
            <Route path='Student' element={<Student/>}/>
            <Route path='TeacherInformation/AddTeacher' element={<AddTeacher/>}/>
            <Route path='TeacherInformation/EditTeacher' element={<EditTeacher/>}/>
            <Route path='Teacher' element={<Teacher/>}/>
            <Route path='WorkSchedule' element={<WorkSchedule/>}/>
            <Route path='WorkSchedule/FormWorkSchedule' element={<FormWorkSchedule/>}/>
        </Route>
    </Routes>
);

export const StudentRoutes = () => (
    <Routes>
        <Route path="/" element={<Home/>}>
        <Route path='Inquiries' element={<Inquiries/>}/>
        <Route path='Inquiries/FormInquiries' element={<FormInquiries/>}/>
        <Route path='Certificates' element={<Certificates/>}/>
        <Route path='Certificates/FormCertificates' element={<FormCertificates/>}/>
        </Route>
    </Routes>
);

export const TeacherRoutes = () => (
    <Routes>
        <Route path="/" element={<Home/>}>
            
        </Route>
    </Routes>
);