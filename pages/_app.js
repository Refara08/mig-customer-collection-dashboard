import "../styles/globals.css";

import { NotificationContextProvider } from "../store/notif-context";
import { AuthContextProvider } from "../store/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <Component {...pageProps} />
      </NotificationContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
