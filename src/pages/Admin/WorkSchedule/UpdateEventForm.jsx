import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from "moment";

import axios from 'axios';

export default function UpdateEventForm({ fid, handleClose }) {
  const [workSchedule, setWorkSchedule] = useState({
    workScheduleID: '',
    teacherID: '',
    teacherName: '',
    daysOfWork: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    setWorkSchedule({
      workScheduleID: fid.workScheduleID,
      teacherID: fid.teacherID,
      teacherName: fid.teacherName,
      daysOfWork: fid.daysOfWork, // Format the date as "yyyy-MM-ddTHH:mm" for datetime-local input
      startTime: fid.startTime, // Format the date as "yyyy-MM-dd" for date input
      endTime: fid.endTime, // Format the date as "yyyy-MM-ddTHH:mm" for datetime-local input
    });
  }, [fid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkSchedule({
      ...workSchedule,
      [name]: value,
    });
  };

  const deleteUser = (workScheduleID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteEvent(workScheduleID);
      }
    });
  };

  const updateEvent = async () => {
    const apiUrl = `${API_BASE_URL}${API_ROUTES.WorkSchedule}/${fid.workScheduleID}`;

    const newWorkSchedule = {
      workScheduleID: workSchedule.workScheduleID,
      teacherID: workSchedule.teacherID,
      teacherName: workSchedule.teacherName,
      daysOfWork: moment(workSchedule.daysOfWork).toISOString(), // Convert datetime string to ISO format
      startTime: moment(workSchedule.startTime).toISOString(), // Convert date string to ISO format
      endTime: moment(workSchedule.endTime).toISOString(), // Convert datetime string to ISO format
      createDate: new Date(),
      updateDate: new Date(),
    };

    try {
      const response = await axios.put(apiUrl, newWorkSchedule, {
        headers: API_HEADERS,
      });
      if (response.status === 200) {
        handleClose();
        Swal.fire('Update Work Schedule Success !!!', "", "success");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.log(error);
    }
  };

  const deleteEvent = async (workScheduleID) => {
    const apiUrl = `${API_BASE_URL}${API_ROUTES.WorkSchedule}/${workScheduleID}`;

    try {
      const response = await axios.delete(apiUrl, {
        headers: API_HEADERS,
      });

      if (response.status === 200) {
        handleClose();
        Swal.fire('Delete Work Schedule Success !!!', '', 'success');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.log(error);
    }
  };

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
                    value={workSchedule.workScheduleID}
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
                    value={workSchedule.teacherID}
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
                    value={workSchedule.teacherName}
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
                    value={workSchedule.daysOfWork}
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
                    value={workSchedule.startTime}
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
                    value={workSchedule.endTime}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={updateEvent}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
          <button
            onClick={() => deleteUser(workSchedule.workScheduleID)}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
};
