import { getHourSlices } from "../utils";
import HourSlice from "./HourSlice";

function DayTimeline(props) {
  const hourSlices = getHourSlices();

  return (
    <div className="day-timeline">
      {hourSlices.map(([from, to], i) => (
        <HourSlice key={i} from={from} to={to} />
      ))}
    </div>
  );
}

export default DayTimeline;
