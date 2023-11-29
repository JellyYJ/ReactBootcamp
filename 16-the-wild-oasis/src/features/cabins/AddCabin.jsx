import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "../cabins/CabinTable";

// This version uses Compound component
function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        {/* cloneElement: Without passing in any props(ie: onClick func) */}
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        {/* cloneElement: Without passing in any props(ie: onClose func) */}
        <CreateCabinForm />
      </Modal.Window>

      {/* Just for showing ths flexibility of the Compound component*/}
      {/* By giving different names, the .Open can control corresponding modal */}
      <Modal.Open opens="table">
        <Button>Show Cabins</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
