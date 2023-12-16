import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentStays = [], isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["recentStays", `last-${numDays}`],
  });

  const confirmedStays = recentStays.filter(
    (booking) => booking.status !== "unconfirmed"
  );

  return { recentStays, isLoading, confirmedStays };
};
