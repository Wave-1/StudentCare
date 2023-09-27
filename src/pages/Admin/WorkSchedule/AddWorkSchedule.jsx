import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
export default function AddWorkSchedule({ onClose }) {
  const [newWorkSchedule, setNewWorkSchedule] = useState({
    workScheduleID: '',
    teacherID: '',
    teacherName: '',
    daysOfWork: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewWorkSchedule({
      ...newWorkSchedule,
      [name]: value,
    });
  };

  const createEvent = async () => {
    const apiUrl = `${API_BASE_URL}${API_ROUTES.WorkSchedule}`;
    const workScheduleData = {
      workScheduleID: newWorkSchedule.workScheduleID,
      teacherID: newWorkSchedule.teacherID,
      teacherName: newWorkSchedule.teacherName,
      daysOfWork: newWorkSchedule.daysOfWork,
      startTime: newWorkSchedule.startTime,
      endTime: newWorkSchedule.endTime,
      createDate: new Date(),
      updateDate: new Date(),
    }
    try {
      const response = await axios.post(apiUrl, workScheduleData, {
        headers: API_HEADERS,
      });
      if (response.status === 200) {
        setNewWorkSchedule({
          workScheduleID: '',
          teacherID: '',
          teacherName: '',
          daysOfWork: '',
          startTime: '',
          endTime: '',
        });
        onClose();
        Swal.fire("Add Work Schedule Successfully !!!", "", "success");
      } else {
        // Xử lý lỗi khi thêm giáo viên thất bại
        console.error('Failed to create teacher !!!');
      }

    } catch (error) {
      toast.error(`Đã xảy ra lỗi: ${error.message}`);
      console.error('Đã xảy ra lỗi:', error);
    }
  }

  return (
    <>
      <div className="container mx-auto p-4 space-y-12">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-4xl font-semibold leading-3 text-gray-900 text-center">Update Teacher</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Work Schedule ID
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="workScheduleID"
                    id="workScheduleID"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={newWorkSchedule.workScheduleID}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Teacher ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="teacherID"
                    id="teacherID"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={newWorkSchedule.teacherID}
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
                    value={newWorkSchedule.teacherName}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Days Of Work
                </label>
                <div className="mt-2">
                  <input
                    id="daysOfWork"
                    name="daysOfWork"
                    type="datetime-local"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={newWorkSchedule.daysOfWork}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Start Time
                </label>
                <div className="mt-2">
                  <input
                    id="startTime"
                    name="startTime"
                    type="datetime-local"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={newWorkSchedule.startTime}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  End Time
                </label>
                <div className="mt-2">
                  <input
                    id="endTime"
                    name="endTime"
                    type="datetime-local"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={newWorkSchedule.endTime}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={createEvent}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
