import NotifModal from "./NotifOverlay";

const Notification = (props) => {
  const { status, message } = props;

  let styling;

  if (status === "pending") {
    styling = " bg-yellow-600";
  } else if (status === "success") {
    styling = "bg-green-700";
  } else if (status === "error") {
    styling = "bg-red-700";
  }

  return (
    <NotifModal>
      <div
        className={`${styling}  text-white py-4 px-8 rounded-b-lg w-screen md:w-fit flex gap-20`}
      >
        <span>{status}</span>
        <span>{message}</span>
      </div>
    </NotifModal>
  );
};

export default Notification;
