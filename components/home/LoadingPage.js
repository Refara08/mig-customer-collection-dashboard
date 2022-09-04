import LoadingIcon from "../icons/Loading";

const LoadingPage = () => {
  return (
    <div className="w-full h-[60%] grid place-items-center">
      <div className="animate-spin mb-8">
        <LoadingIcon size={"5rem"} />
      </div>
      <p className="text-3xl font-bold text-stone-500">Loading data....</p>
    </div>
  );
};

export default LoadingPage;
