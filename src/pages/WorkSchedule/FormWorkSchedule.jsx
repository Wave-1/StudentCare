import React from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import '../../index.css'
const localizer = momentLocalizer(moment);

function FormCalendar(props) {
  const envents = [
    {
      start: moment("2023-09-12T12:00:00").toDate(),
      end: moment("2023-09-12T16:00:00").toDate(),
      title: "January"
    }
  ];
  return <BigCalendar {...props} events={envents}  localizer={localizer} />;
}

export default FormCalendar;
