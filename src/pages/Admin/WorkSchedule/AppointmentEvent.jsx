// AppointmentEvent.js
import React from "react";

const AppointmentEvent = ({ event }) => {
  return (
    <div>
      <strong>{event.title}</strong><br/>
    </div>
  );
};

export default AppointmentEvent;
