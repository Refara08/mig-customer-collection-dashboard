import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Squeeze as Hamburger } from "hamburger-react";
import UtilsPanelMobile from "./utils-panel-mobile/UtilsPanelMobile";

import CreateMobileBtnModal from "../create-customer/create-mobile-button/CreateCustomerMobileButtonOverlay";

import SearchIcon from "../icons/SearchIcon";
import PlusIcon from "../icons/PlusIcon";

const TopPanelMobile = (props) => {
  const { getInput, getFilter, getSort } = props;
  const [inputIsFocus, setInputIsFocus] = useState(false);
  const [enteredSearch, setEnteredSearch] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const router = useRouter();

  const createCustomerHandler = () => {
    router.replace("/create-customer");
  };

  useEffect(() => {
    getInput(enteredSearch.toLowerCase());
  }, [getInput, enteredSearch]);

  return (
    <>
      {isNavOpen && (
        <UtilsPanelMobile
          getFilter={getFilter}
          getSort={getSort}
          onClose={() => setIsNavOpen(false)}
        />
      )}
      <div className="md:hidden flex items-center mt-2 px-2">
        <div className="pr-1">
          <Hamburger toggled={isNavOpen} toggle={setIsNavOpen} size={20} />
        </div>
        <CreateMobileBtnModal>
          <button
            onClick={createCustomerHandler}
            className="flex gap-2 items-center bg-blue-800 hover:bg-blue-600 hover:shadow-lg transition duration-300 text-white font-semibold py-2 px-6 rounded-3xl"
          >
            <PlusIcon size={"1.2rem"} />
            <span>Add Customer</span>
          </button>
        </CreateMobileBtnModal>
        <form className="flex flex-[1] flex-row-reverse gap-2 items-center justify-start">
          <div
            className={`${
              inputIsFocus ? "bg-black text-white" : "bg-transparent text-black"
            } p-2 rounded-full transition duration-300`}
          >
            <SearchIcon size="1.2rem" />
          </div>
          <input
            className="border-2 border-gray-300 rounded-2xl py-1 px-5 w-full"
            type="text"
            name="search-customer"
            id="search-customer"
            placeholder="Find customer ..."
            onFocus={() => setInputIsFocus(true)}
            onBlur={() => setInputIsFocus(false)}
            onChange={(e) => setEnteredSearch(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};

export default TopPanelMobile;
