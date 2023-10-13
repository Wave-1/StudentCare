import React, { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { API_BASE_URL, API_HEADERS, API_ROUTES } from '../../../apiConfig';
import AppointmentEvent from "./AppointmentEvent";
import Box from "@mui/material/Box";
import AddWorkSchedule from "./AddWorkSchedule";
import UpdateEventForm from "./UpdateEventForm";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Modal from '@mui/material/Modal';

const localizer = momentLocalizer(moment);

function FormWorkSchedule(props) {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event
  const [updateFormOpen, setUpdateFormOpen] = useState(false); // Control whether the update form is open
  const [formid, setFormID] = useState('');

  useEffect(() => {
    fetchEvents(); // Fetch events when the component mounts
  }, []);

  const fetchEvents = () => {
    axios
      .get(API_BASE_URL + API_ROUTES.WorkSchedule, {
        headers: API_HEADERS
      })
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          title: event.teacherName,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    const eventFormId = {
      workScheduleID: event.workScheduleID,
      teacherID: event.teacherID,
      teacherName: event.teacherName,
      daysOfWork: event.daysOfWork,
      startTime: event.startTime,
      endTime: event.endTime,
    } // Set the formid based on your logic
    setFormID(eventFormId); // Update the formid state
    setUpdateFormOpen(true); // Open the update form when an event is clicked
  };

  const handleCloseUpdateForm = () => {
    setUpdateFormOpen(false); // Close the update form
  };

  // const handleSelectSlot = ({ start, end }) => {
  //   // setSelectedDate({ start, end });
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const availableViews = ['month', 'agenda'];
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-max">
          <AddWorkSchedule onClose={() => setOpen(false)} />
        </Box>
      </Modal>
      <Typography
        variant="h6"
        component="div"
        className="flex-grow"
      ></Typography>
      <Button
        variant="contained"
        endIcon={<AddCircleIcon />}
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white rounded hover:bg-violet-600"
      >
        Add
      </Button>
      <BigCalendar
        {...props}
        events={events}
        localizer={localizer}
        views={availableViews}
        components={{
          event: AppointmentEvent,
        }}
        onSelectEvent={handleEventClick}
        // onSelectSlot={handleSelectSlot}
      />

      {selectedEvent && updateFormOpen && (
        <Modal
          open={updateFormOpen}
          onClose={handleCloseUpdateForm}
          aria-labelledby="update-event-modal-title"
          aria-describedby="update-event-modal-description"
        >
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-max">
            <UpdateEventForm
              fid={formid}
              selectedEvent={selectedEvent}
              handleClose={handleCloseUpdateForm}
              refetchEvents={fetchEvents} // Pass a callback to refetch events
            />
          </Box>
        </Modal>
      )}
    </>
  );
}

export default FormWorkSchedule;
