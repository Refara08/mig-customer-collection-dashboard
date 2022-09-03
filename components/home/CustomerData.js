import TrashIcon from "../icons/TrashIcon";
import PencilIcon from "../icons/PencilIcon";

const CustomerData = () => {
  return (
    <div className="flex justify-between items-center gap-8 rounded-xl border-[1px] border-b-[1px] hover:border-b-transparent hover:shadow-xl border-stone-500 transition duration-300 py-6 px-8">
      <div className="flex justify-center items-center place-self-start gap-4">
        <p className="text-green-700 font-bold text-xl">Active</p>
        <h2 className="font-bold text-2xl">Max Emard</h2>
      </div>
      <div className="flex flex-[1] flex-col">
        <div>
          <p className="mb-2">
            <span className="font-semibold">Address: </span>
            <span>1137 Juanita Lock Apt. 113\nLake Glennabury, VA 73649</span>
          </p>
        </div>
        <div className="pr-20 flex gap-8">
          <p className="mb-2">
            <span className="font-semibold">Country: </span>
            <span>French Guiana</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone: </span>{" "}
            <span>(651) 358-5560</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Job Title: </span>{" "}
            <span>Gaming Manager</span>
          </p>
        </div>
      </div>
      <div className="flex gap-4 place-self-start">
        <button className="flex gap-4 items-center bg-green-700 hover:bg-green-600 hover:shadow-md transition duration-300 text-white py-1 px-5 rounded-md">
          <PencilIcon size={"2vh"} />
          <span>Edit</span>
        </button>
        <button className="flex gap-4 items-center bg-red-700 hover:bg-red-600 hover:shadow-md transition duration-300 text-white py-1 px-5 rounded-md">
          <TrashIcon size={"2vh"} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerData;
