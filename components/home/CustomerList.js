import CustomerData from "./CustomerData";

const sortByName = (arr) => {
  const sortByNameList = arr.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return sortByNameList;
};

const sortByCountry = (arr) => {
  const sortByCountryList = arr.sort((a, b) => {
    if (a.country < b.country) {
      return -1;
    }
    if (a.country > b.country) {
      return 1;
    }
    return 0;
  });

  return sortByCountryList;
};

const CustomerList = (props) => {
  const { customerList, sortBy } = props;

  if (sortBy === "") {
    return (
      <div className="px-4 flex flex-col gap-4 ">
        {customerList.map((item) => (
          <CustomerData key={item.id} data={item} />
        ))}
      </div>
    );
  }

  if (sortBy === "NAME") {
    return (
      <div className="px-4 flex flex-col gap-4 ">
        {sortByName(customerList).map((item) => (
          <CustomerData key={item.id} data={item} />
        ))}
      </div>
    );
  }

  if (sortBy === "COUNTRY") {
    return (
      <div className="px-4 flex flex-col gap-4 ">
        {sortByCountry(customerList).map((item) => (
          <CustomerData key={item.id} data={item} />
        ))}
      </div>
    );
  }
};

export default CustomerList;
