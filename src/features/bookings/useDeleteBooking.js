import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,

    onSuccess: () => {
      toast.success("Booking was successfully deleted");
      queryClient.invalidateQueries({ active: true });
      navigate(-1);
    },

    onError: () => {
      toast.error(" An error occured while deleting the booking ");
    },
  });

                  

  return { deleteBooking, isDeleting };
};
