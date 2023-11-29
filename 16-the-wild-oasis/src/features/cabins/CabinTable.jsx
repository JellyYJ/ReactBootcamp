import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;

  return (
    <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div></div>
        <div>Cabins</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}
export default CabinTable;
