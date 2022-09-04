import { useContext } from "react";
import { useRouter } from "next/router";

import TrashIcon from "../icons/TrashIcon";
import PencilIcon from "../icons/PencilIcon";

import updateCustomerDataContext from "../../store/update-customer-ctx";
import ConfirmationContext from "../../store/confirmation-context";

const CustomerData = (props) => {
  const updateDataCtx = useContext(updateCustomerDataContext);
  const confirmCtx = useContext(ConfirmationContext);
  const router = useRouter();
  const {
    id,
    name,
    address,
    country,
    phone_number,
    job_title,
    status,
    created_at,
    updated_at,
  } = props.data;

  const formatedCreatedAt = `${new Date(created_at).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )} ${new Date(created_at).getHours()}:${new Date(created_at).getMinutes()}`;

  const formatedUpdatedAt = `${new Date(updated_at).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )} ${new Date(updated_at).getHours()}:${new Date(updated_at).getMinutes()}`;

  const deleteCustomerDataHandler = () => {
    updateDataCtx.updateData(props.data);
    confirmCtx.updateTitle("Apakah anda yakin ingin membuang data ini?");
    confirmCtx.updateRequestConfig({
      method: "DELETE",
      body: {
        id: id,
      },
    });
  };

  const editCustomerDataHandler = () => {
    updateDataCtx.updateData(props.data);
    router.replace("/update-customer");
  };

  return (
    <div
      id={id}
      className="flex justify-between items-center gap-8 rounded-xl border-t-2 hover:border-b-transparent hover:shadow-xl border-stone-300 transition duration-300 pt-6 pb-4 px-8"
    >
      <div className="flex-[1] gap-x-20 grid grid-cols-7 grid-rows-5 items-center justify-between">
        <div className="flex flex-col gap-4 justify-between col-span-4 row-span-4">
          <div className="flex justify-center items-center place-self-start gap-4">
            <p
              className={`${
                status ? "text-green-700" : "text-red-700"
              } font-bold text-xl`}
            >
              {status ? "Active" : "InActive"}
            </p>
            <h2 className="font-bold text-2xl">{name}</h2>
          </div>
          <div>
            <p className="flex flex-col mb-2">
              <span className="font-semibold">Address: </span>
              <span>{address}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-2 col-span-3 row-span-4">
          <p className="grid grid-cols-10 mb-2 gap-2">
            <span className="font-semibold w-max col-span-3">Country: </span>
            <span className="w-fit col-span-7">{country}</span>
          </p>
          <p className="grid grid-cols-10 mb-2 gap-2">
            <span className="font-semibold w-max col-span-3">Phone: </span>{" "}
            <span className="w-fit col-span-7">{phone_number}</span>
          </p>
          <p className="grid grid-cols-10 mb-2 gap-2">
            <span className="font-semibold w-max col-span-3">Job Title: </span>{" "}
            <span className="w-fit col-span-7">{job_title}</span>
          </p>
        </div>
        <div className="col-span-7 row-span-1 flex gap-4 mt-2">
          <p className="text-xs">
            <span className="font-semibold w-max col-span-3">Updated at: </span>
            <span>{formatedUpdatedAt}</span>
          </p>
          <p className="text-xs">
            <span className="font-semibold w-max col-span-3">Created at: </span>
            <span>{formatedCreatedAt}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={editCustomerDataHandler}
          className="flex gap-4 items-center bg-green-700 hover:bg-green-600 hover:shadow-md transition duration-300 text-white py-1 px-5 rounded-md"
        >
          <PencilIcon size={"2vh"} />
          <span>Edit</span>
        </button>
        <button
          onClick={deleteCustomerDataHandler}
          className="flex gap-4 items-center bg-red-700 hover:bg-red-600 hover:shadow-md transition duration-300 text-white py-1 px-5 rounded-md"
        >
          <TrashIcon size={"2vh"} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerData;
