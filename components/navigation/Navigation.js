import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import authContext from "../../store/auth-context";
import NotificationContext from "../../store/notif-context";

const Navigation = () => {
  const authCtx = useContext(authContext);
  const notifCtx = useContext(NotificationContext);
  const router = useRouter();

  const logoutHandler = () => {
    notifCtx.updateStatus("pending");
    notifCtx.updateMessage("Logging out....");

    authCtx.logout();
    router.replace("/auth");

    notifCtx.updateStatus("success");
    notifCtx.updateMessage("You successfully logged out!");
  };

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      router.replace("/auth");
    }
  }, []);

  return (
    <div className="sticky top-0 shadow-md bg-white bg-opacity-75 backdrop-blur-lg px-8 py-4 z-30">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <a className="text-2xl font-bold">Costumer Collection</a>
        </Link>
        <ul>
          <li
            onClick={logoutHandler}
            className="bg-white text-red-600 font-bold py-2 px-6 rounded-3xl transition-all duration-300 hover:shadow-lg hover:bg-red-500 hover:text-white cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
