import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { createCabin } = useCreateCabin();

  const handleDuplicate = () => {
    createCabin({
      name: `copy of ${name}`,
      image,
      discount,
      regularPrice,
      maxCapacity,
    });
  };

  const {
    image,
    name,
    regularPrice,
    discount,
    maxCapacity,
    id: cabinId,
  } = cabin;

  const { isLoading: isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin> {name} </Cabin>
        <div> Fits up to {maxCapacity} guests </div>
        <Price> {formatCurrency(regularPrice)} </Price>
        <Discount>
          {" "}
          {!discount ? <span> &mdash; </span> : formatCurrency(discount)}{" "}
        </Discount>
        <div> 
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  {" "}
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit-cabin">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete-cabin">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit-cabin">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>
               
              <Modal.Window name="delete-cabin">
                <ConfirmDelete
                  resourceName="cabin"
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                  
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
