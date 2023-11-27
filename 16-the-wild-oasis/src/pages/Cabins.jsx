import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import CabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import { useState } from "react";

function Cabins() {
  // Testing if we can fetch data from Supabase
  //   useEffect(function () {
  //     getCabins().then((data) => console.log(data));
  //   }, []);

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>FILTER/SORT</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add New Cabin
        </Button>
        {showForm && <CabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
