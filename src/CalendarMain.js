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
  const createEvent = (title, fromDate, toDate) => {
    const newEvent = {
      id: uuidv4(),
      title,
      fromDate,
      toDate,
    };

    setEventsData([...eventsData, newEvent]);
  };

  return (
    <CalendarContext.Provider value={{ eventsData, createEvent }}>
      <CalendarBoard>
        <WeekViewMain />
      </CalendarBoard>
    </CalendarContext.Provider>
  );
}

export default CalendarMain;
