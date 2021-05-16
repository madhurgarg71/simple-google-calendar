import { getHourSlices } from "../utils";
import HourSlice from "./HourSlice";

function DayTimeline(props) {
  const { day } = props;
  const hourSlices = getHourSlices(day);

  return (
    <div className="day-timeline">
      {hourSlices.map(([from, to], i) => (
        <HourSlice key={i} from={from} to={to} />
      ))}
    </div>
  );
}

export default DayTimeline;
