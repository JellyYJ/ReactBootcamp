import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // very important to include bookingId, otherwise, the booking page will always show the same booking stored in the cache.
    queryFn: () => getBooking(bookingId),
  });

  return { isLoading, booking, error };
}
