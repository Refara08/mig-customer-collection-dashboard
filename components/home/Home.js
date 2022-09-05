import { useContext, useEffect, useState } from "react";

import UtilsPanel from "./UtilsPanel";
import TopPanel from "./TopPanel";
import TopPanelMobile from "./TopPanelMobile";

import authContext from "../../store/auth-context";
import ConfirmationContext from "../../store/confirmation-context";

import LoadingPage from "./LoadingPage";
import CustomerList from "./CustomerList";

const Home = () => {
  const { token } = useContext(authContext);
  const { isLoading } = useContext(ConfirmationContext);

  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadedData, setLoadedData] = useState([]);
  const [sortBy, setSortBy] = useState(false);

  useEffect(() => {
    setLoadedData(result.data);
  }, [result]);

  const getEnteredSearch = (input) => {
    if (!loading) {
      setLoadedData(
        result.data.filter((item) => item.name.toLowerCase().includes(input))
      );
    }
  };

  const getSortHandler = (sort) => {
    setSortBy(sort);
  };

  const getFilterHandler = (filter) => {
    if (!loading && filter === "ALL") {
      setLoadedData(result.data);
    } else if (!loading && filter === "ACTIVE") {
      setLoadedData(result.data.filter((item) => item.status === true));
    } else if (!loading && filter === "INACTIVE") {
      setLoadedData(result.data.filter((item) => item.status === false));
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://mitramas-test.herokuapp.com/customers", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        setError(error);
        console.error("Error Fetching data.. ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, isLoading]);

  return (
    <div className="flex  h-[93vh] md:h-[90vh] lg:h-[89vh] overflow-hidden border-b-2 border-stone-300">
      <UtilsPanel getFilter={getFilterHandler} getSort={getSortHandler} />
      <div className="flex flex-[1] flex-col p-0 gap-y-2 md:gap-y-4 w-full overflow-y-scroll">
        <div className="block md:hidden sticky top-0 left-0 z-20 bg-white">
          <TopPanelMobile
            getInput={getEnteredSearch}
            getFilter={getFilterHandler}
            getSort={getSortHandler}
          />
        </div>
        <div className="md:block hidden sticky top-0 left-0 z-20 bg-white pb-2">
          <TopPanel getInput={getEnteredSearch} />
        </div>
        {loading && <LoadingPage />}
        {!loading && loadedData && (
          <CustomerList
            isLoading={loading}
            customerList={loadedData}
            sortBy={sortBy}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
