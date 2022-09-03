import { useRef, useContext } from "react";
import { useRouter } from "next/router";
import NotificationContext from "../../store/notif-context";
import authContext from "../../store/auth-context";
import Notification from "../notification/Notification";

const sendRequest = async (obj) => {
  const response = await fetch(
    "https://mitramas-test.herokuapp.com/auth/login",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const expiringTimeStamp = new Date(
    new Date().getTime() + +data.expires_in * 1000
  );

  return {
    data,
    expiringTimeStamp,
  };
};

const Auth = () => {
  const router = useRouter();
  const notifCtx = useContext(NotificationContext);
  const authCtx = useContext(authContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (
      !enteredEmail ||
      !enteredEmail.includes("@") ||
      !enteredPassword ||
      enteredPassword.trim().length < 7
    ) {
      return;
    }

    try {
      notifCtx.updateStatus("pending");
      notifCtx.updateMessage("Logging in....");

      const { data, expiringTimeStamp } = await sendRequest({
        email: enteredEmail,
        password: enteredPassword,
      });

      authCtx.login(data.access_token, expiringTimeStamp);

      notifCtx.updateStatus("success");
      notifCtx.updateMessage("You are logged in");

      router.replace("/");
    } catch (error) {
      notifCtx.updateStatus("error");
      notifCtx.updateMessage(error.message);
    }
  };

  return (
    <section className="w-full h-[80vh] grid place-items-center">
      {notifCtx.status && (
        <Notification status={notifCtx.status} message={notifCtx.message} />
      )}
      {/* <Notification status={"success"} message={"you are logged in!"} /> */}
      <div className="w-[400px] p-6 rounded-xl shadow-xl border-[1px] border-gray-300">
        <h1 className="text-center font-bold text-2xl">welcome</h1>
        <p className="text-center text-sm text-gray-400 mb-8">
          *auto-fill only for demo
        </p>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="email">Your Email</label>
            <input
              className="border-[1px] border-gray-300 py-2 px-5 rounded-lg"
              type="email"
              id="email"
              required
              ref={emailRef}
              defaultValue="akun4@mig.id"
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="password">Your Password</label>
            <input
              className="border-[1px] border-gray-300 py-2 px-5 rounded-lg"
              type="password"
              id="password"
              required
              ref={passwordRef}
              defaultValue="EB3A3BE7"
            />
          </div>
          <div className="flex justify-center items-center mt-8">
            <button className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-500 hover:shadow-xl transition duration-300">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
