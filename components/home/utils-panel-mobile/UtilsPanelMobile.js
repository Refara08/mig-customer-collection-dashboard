import { useState, useEffect } from "react";

import UtilsPanelModal from "./UtilsPanelOverlay";

const UtilsPanelMobile = (props) => {
  const { getFilter, getSort, onClose } = props;
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    getFilter(filter);
  }, [filter]);

  useEffect(() => {
    getSort(sortBy);
    // console.log(sortBy);
  }, [sortBy]);

  return (
    <UtilsPanelModal onClose={onClose}>
      <div className="md:hidden block bg-white pb-4 pt-8 pl-2 border-r-2 border-stone-300 h-screen">
        {/* filter */}
        <div className=" w-full mb-12">
          <h3 className="mb-2 px-5 uppercase tracking-widest">filter</h3>
          <button
            onClick={() => {
              setFilter("ALL");
            }}
            className={`py-3 px-5 w-full border-l-2 hover:bg-stone-300 hover:border-black text-left ${
              filter === "ALL"
                ? "bg-stone-300 border-black"
                : "bg-white border-transparent"
            }`}
          >
            all
          </button>
          <button
            onClick={() => setFilter("ACTIVE")}
            className={`py-3 px-5 w-full border-l-2 hover:bg-stone-300 hover:border-black text-left ${
              filter === "ACTIVE"
                ? "bg-stone-300 border-black"
                : "bg-white border-transparent"
            }`}
          >
            active
          </button>
          <button
            onClick={() => setFilter("INACTIVE")}
            className={`py-3 px-5 w-full border-l-2 hover:bg-stone-300 hover:border-black text-left ${
              filter === "INACTIVE"
                ? "bg-stone-300 border-black"
                : "bg-white border-transparent"
            }`}
          >
            inactive
          </button>
        </div>
        <div className=" w-full mb-12">
          <h3 className="mb-2 px-5 uppercase tracking-widest">Sort</h3>
          <button
            onClick={() => setSortBy("NAME")}
            className={`py-3 px-5 w-full border-l-2 hover:bg-stone-300 hover:border-black text-left ${
              sortBy === "NAME"
                ? "bg-stone-300 border-black"
                : "bg-white border-transparent"
            }`}
          >
            by Name
          </button>
          <button
            onClick={() => setSortBy("COUNTRY")}
            className={`py-3 px-5 w-full border-l-2 hover:bg-stone-300 hover:border-black text-left ${
              sortBy === "COUNTRY"
                ? "bg-stone-300 border-black"
                : "bg-white border-transparent"
            }`}
          >
            by Country
          </button>
        </div>
      </div>
    </UtilsPanelModal>
  );
};

export default UtilsPanelMobile;
