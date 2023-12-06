import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({ queryKey: ["booking"], queryFn: () => getBooking(bookingId) });

  return { isLoading, booking, error };
}

export default useBooking;
