import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was successfully checked out `);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () =>
      toast.error("An error occured while checking out the booking"),
  });
  
  return { checkout, isCheckingout };
};
