import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const numCheckins = confirmedStays.length;

  const occupancy =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        color="blue"
        value={numBookings}
        title="Bookings"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        color="green"
        value={formatCurrency(sales)}
        title="Sales"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        color="indigo"
        value={numCheckins}
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        color="yellow"
        value={Math.round(occupancy * 100) + "%"}
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
