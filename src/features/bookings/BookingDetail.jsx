import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking = {} } = useBooking();

  const { checkout, isCheckingout } = useCheckout();

  const { isDeleting, deleteBooking } = useDeleteBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking # {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open opens="delete">
          <Button variation="danger">Delete</Button>
        </Modal.Open>

        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`checkin/${bookingId}`, { replace: true })}
          >
            check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button disabled={isCheckingout} onClick={() => checkout(bookingId)}>
            check out
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      <Modal.Window name="delete">
        <ConfirmDelete
          disabled={isDeleting}
          resourceName="booking"
          onConfirm={() => deleteBooking(bookingId)}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
