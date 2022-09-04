import { useState, useContext } from "react";
import { useRouter } from "next/router";

import NotificationContext from "../../store/notif-context";
import ConfirmationContext from "../../store/confirmation-context";
import authContext from "../../store/auth-context";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import PlusIcon from "../icons/PlusIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

const UpdateCustomer = (props) => {
  const { id, name, address, country, phone_number, job_title, status } =
    props.data;

  const notifCtx = useContext(NotificationContext);
  const confirmCtx = useContext(ConfirmationContext);
  const authCtx = useContext(authContext);
  const router = useRouter();

  const [customerName, setCustomerName] = useState(name);
  const [customerAddress, setCustomerAddress] = useState(address);
  const [customerCountry, setCustomerCountry] = useState(country);
  const [customerPhone, setCustomerPhone] = useState(phone_number);
  const [customerJob, setCustomerJob] = useState(job_title);
  const [customerStatus, setCustomerStatus] = useState(status);

  const toggleStatusHandler = () => {
    setCustomerStatus((prev) => !prev);
  };

  const backToHome = () => {
    router.replace("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !customerName ||
      customerName.trim().length === 0 ||
      !customerAddress ||
      customerAddress.trim().length === 0 ||
      !customerCountry ||
      customerCountry.trim().length === 0 ||
      !customerPhone ||
      customerPhone.trim().length === 0 ||
      !customerJob ||
      customerJob.trim().length === 0 ||
      !authCtx.token
    ) {
      notifCtx.status("error");
      notifCtx.message("Invalid Input");
      return;
    }

    confirmCtx.updateTitle("Simpan Perubahan?");
    confirmCtx.updateRequestConfig({
      method: "PUT",
      body: {
        id: id,
        name: customerName,
        address: customerAddress,
        country: customerCountry,
        phone_number: customerPhone,
        job_title: customerJob,
        status: customerStatus,
      },
    });
  };

  return (
    <div className="w-[639px] border-2 border-t-0 border-stone-300 rounded-lg p-4 mx-auto">
      <button
        onClick={backToHome}
        className="flex gap-2 items-center justify-start"
      >
        <ArrowLeftIcon size="1.5rem" />
        <span>back</span>
      </button>
      <h2 className="text-2xl font-bold py-4 mb-4 border-b-2 border-stone-300">
        Update Customer Data
      </h2>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col mb-4">
          <label className="font-semibold pl-1 mb-1" htmlFor="name">
            Nama
          </label>
          <input
            className="border-2 border-stone-300 py-2 px-4 rounded-xl"
            type="text"
            name="name"
            id="name"
            defaultValue={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center gap-8 mb-4">
          <label className="font-semibold pl-1 mb-1" htmlFor="status">
            <span>Status: </span>
            <span
              className={`${
                customerStatus ? "text-green-700" : "text-red-700"
              }`}
            >
              {customerStatus ? "Active" : "Inactive"}
            </span>
          </label>
          <Toggle
            id="status"
            className="update-toggle"
            defaultChecked={customerStatus}
            onChange={toggleStatusHandler}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-semibold pl-1 mb-1" htmlFor="job-title">
            Job Title
          </label>
          <input
            className="border-2 border-stone-300 py-2 px-4 rounded-xl"
            type="text"
            name="job-title"
            id="job-title"
            defaultValue={customerJob}
            onChange={(e) => setCustomerJob(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-semibold pl-1 mb-1" htmlFor="phone">
            Phone
          </label>
          <input
            className="border-2 border-stone-300 py-2 px-4 rounded-xl"
            type="text"
            name="phone"
            id="phone"
            defaultValue={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-semibold pl-1 mb-1" htmlFor="address">
            Address
          </label>
          <input
            className="border-2 border-stone-300 py-2 px-4 rounded-xl"
            type="text"
            name="address"
            id="address"
            defaultValue={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-semibold pl-1 mb-1" htmlFor="country">
            Country
          </label>
          <input
            className="border-2 border-stone-300 py-2 px-4 rounded-xl"
            type="text"
            name="country"
            id="country"
            defaultValue={customerCountry}
            onChange={(e) => setCustomerCountry(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end my-8">
          <button className="flex gap-2 items-center bg-blue-800 hover:bg-blue-600 hover:shadow-lg transition duration-300 text-white font-semibold py-2 px-6 rounded-3xl">
            <PlusIcon size={"1rem"} />
            <span>Update</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCustomer;
