import CalendarBoard from "./components/CalendarBoard";
import WeekViewMain from "./components/WeekViewMain";
import { useState } from "react";
import { CalendarContext } from "./Context";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const dummyData = [
  {
    id: uuidv4(),
    title: "Test event",
    fromDate: dayjs("09-05-2021,02:50AM", "DD-MM-YYYY,hh:mmA"),
    toDate: dayjs("09-05-2021,03:30AM", "DD-MM-YYYY,hh:mmA"),
  },
  {
    id: uuidv4(),
    title: "Test event 1",
    fromDate: dayjs("17-05-2021,02:50AM", "DD-MM-YYYY,hh:mmA"),
    toDate: dayjs("17-05-2021,03:30AM", "DD-MM-YYYY,hh:mmA"),
  },
];

function CalendarMain() {
  const [eventsData, setEventsData] = useState(dummyData);
  const createEvent = (details, callback) => {
    const { title, from, to } = details;
    const newEvent = {
      id: uuidv4(),
      title,
      fromDate: from,
      toDate: to,
    };

    setEventsData([...eventsData, newEvent]);
    callback();
  };

  const editEvent = (id, details, callback) => {
    const { title, from, to } = details;
    const updatedEventsData = eventsData.map((event) => {
      if (event.id === id) {
        event.title = title;
        event.fromDate = from;
        event.toDate = to;
      }
      return event;
    });

    setEventsData(updatedEventsData);
    callback();
  };

  const deleteEvent = (id) => {
    const updatedEventsData = eventsData.filter((event) => event.id !== id);
    setEventsData(updatedEventsData);
  };

  const getEvent = (id) => {
    return eventsData.find((event) => event.id === id);
  };

  return (
    <CalendarContext.Provider
      value={{
        eventsData,
        createEvent,
        getEvent,
        editEvent,
        deleteEvent,
      }}
    >
      <CalendarBoard>
        <WeekViewMain />
      </CalendarBoard>
    </CalendarContext.Provider>
  );
}

export default CalendarMain;
