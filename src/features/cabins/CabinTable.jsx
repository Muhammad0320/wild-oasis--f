import { useGetCabins } from "./useGetCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins = [], isLoading } = useGetCabins();

  const [searchParams] = useSearchParams();

  const filteredValue = searchParams.get("discount") || "all";

  let filteredCabin;

  if (filteredValue === "all") filteredCabin = cabins;

  if (filteredValue === "no-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);

  if (filteredValue === "with-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

  const sortByValue = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortByValue.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabin = filteredCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  

  if (!cabins.length) return <Empty resourse="cabin" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div> Cabin </div>
          <div> capacity </div>
          <div> price </div>
          <div> discount </div>
          <div> </div>
        </Table.Header>

        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
