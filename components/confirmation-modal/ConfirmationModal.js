import { useContext, useState } from "react";
import { useRouter } from "next/router";

import ConfirmationModal from "./ConfirmationOverlay";

import NotificationContext from "../../store/notif-context";
import ConfirmationContext from "../../store/confirmation-context";
import authContext from "../../store/auth-context";

const Confirmation = () => {
  const { title, updateTitle, requestConfig } = useContext(ConfirmationContext);
  const { updateStatus, updateMessage } = useContext(NotificationContext);
  const { token } = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const router = useRouter();

  // console.log(requestConfig);

  const proceedHandler = () => {
    setLoading(true);
    updateStatus("pending");
    updateMessage("processing...");

    fetch("https://mitramas-test.herokuapp.com/customers", {
      method: requestConfig.method,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        Authorization: token,
      },
      body: JSON.stringify(requestConfig.body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setResult(data);
        updateStatus("success");
        updateMessage(data.message);
      })
      .catch((error) => {
        setError(error);
        updateStatus("success");
        updateMessage(error.message);
      });

    router.replace("/");
    updateTitle(null);
  };

  return (
    <ConfirmationModal onCloseCart={() => updateTitle(null)}>
      <div className="bg-white text-black w-[70vw] lg:w-[300px] flex flex-col items-center p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-12">{title}</h2>
        <div className="flex justify-evenly w-full">
          <button
            onClick={proceedHandler}
            className="flex gap-2 items-center bg-green-800 hover:bg-green-600 hover:shadow-lg transition duration-300 text-xl text-white font-semibold py-2 px-6 rounded-3xl"
          >
            Yes
          </button>
          <button
            onClick={() => updateTitle(null)}
            className="flex gap-2 items-center bg-red-800 hover:bg-red-600 hover:shadow-lg transition duration-300 text-xl text-white font-semibold py-2 px-6 rounded-3xl"
          >
            No
          </button>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default Confirmation;
