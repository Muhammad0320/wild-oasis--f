import Filter from "./Filter";
import SortBy from "./SortBy";

function CabinTableOperations() {
  return (
    <>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-z)" },
          { value: "name-desc", label: "Sort by name (Z-A) " },
          { value: "regularPrice-asc", label: "Sort by price (low first) " },
          { value: "regularPrice-desc", label: "Sort by price (high first) " },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low first) " },
          {
            value: "maxCapacity-desc",
            label: "Sort by capacity (high first) ",
          },
        ]}
      />
    </>
  );
}

export default CabinTableOperations;
