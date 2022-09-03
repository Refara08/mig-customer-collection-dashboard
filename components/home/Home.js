import UtilsPanel from "./UtilsPanel";
import CustomerData from "./CustomerData";

const Home = () => {
  return (
    <div className="px-8">
      <UtilsPanel />
      <div className="flex flex-col gap-4">
        <CustomerData />
        <CustomerData />
      </div>
    </div>
  );
};

export default Home;
