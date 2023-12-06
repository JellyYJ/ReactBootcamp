import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

// We want to change the status from "uncomfirmed" to "checked-in", also isPaid to true.
export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      alert(`Booking #${data.id} is successfully checked in.`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => alert("There was an error checking in."),
  });

  return { isCheckingin, checkin };
}
