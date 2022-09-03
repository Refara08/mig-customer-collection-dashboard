import { useState } from "react";

import SearchIcon from "../icons/SearchIcon";

const UtilsPanel = () => {
  const [filter, setFilter] = useState("ALL");
  const [sortByName, setSortByName] = useState(false);
  const [inputIsFocus, setInputIsFocus] = useState(false);

  const toggleSortHandler = () => {
    setSortByName((prev) => !prev);
  };

  return (
    <div className="pb-4 pt-8 flex justify-between items-center">
      <div>
        <form className="flex gap-2 items-center justify-start">
          <div
            className={`${
              inputIsFocus ? "bg-black text-white" : "bg-transparent text-black"
            } p-2 rounded-full transition duration-300`}
          >
            <SearchIcon size="1.2rem" />
          </div>
          <input
            className="border-2 border-gray-300 rounded-2xl py-1 px-5"
            type="text"
            name="search-customer"
            id="search-customer"
            placeholder="Find customer ..."
            onFocus={() => setInputIsFocus(true)}
            onBlur={() => setInputIsFocus(false)}
          />
        </form>
      </div>
      <div className="flex gap-8">
        <button
          onClick={toggleSortHandler}
          className={`py-1 px-5 rounded-2xl hover:shadow-lg ${
            sortByName ? "bg-black text-white" : "bg-stone-300 text-black"
          }`}
        >
          sort by name
        </button>
        <div className="flex gap-4 items-center">
          <h3>filter:</h3>
          <button
            onClick={() => setFilter("ALL")}
            className={`py-1 px-5 rounded-2xl hover:shadow-lg ${
              filter === "ALL"
                ? "bg-black text-white"
                : "bg-stone-300 text-black"
            }`}
          >
            all
          </button>
          <button
            onClick={() => setFilter("ACTIVE")}
            className={`py-1 px-5 rounded-2xl hover:shadow-lg ${
              filter === "ACTIVE"
                ? "bg-black text-white"
                : "bg-stone-300 text-black"
            }`}
          >
            active
          </button>
          <button
            onClick={() => setFilter("INACTIVE")}
            className={`py-1 px-5 rounded-2xl hover:shadow-lg ${
              filter === "INACTIVE"
                ? "bg-black text-white"
                : "bg-stone-300 text-black"
            }`}
          >
            inactive
          </button>
        </div>
      </div>
    </div>
  );
};

export default UtilsPanel;
