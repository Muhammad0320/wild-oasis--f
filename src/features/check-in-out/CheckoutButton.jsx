import Button from "../../ui/Button";

import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckout();
  
  return (
    <Button
      variation="primary"
      disabled={isCheckingout}
      size="small"
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
