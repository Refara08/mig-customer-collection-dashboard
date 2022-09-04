import "../styles/globals.css";

import { NotificationContextProvider } from "../store/notif-context";
import { AuthContextProvider } from "../store/auth-context";
import { UpdateCustomerDataContextProvider } from "../store/update-customer-ctx";
import { ConfirmationContextProvider } from "../store/confirmation-context";

function MyApp({ Component, pageProps }) {
  return (
    <ConfirmationContextProvider>
      <UpdateCustomerDataContextProvider>
        <AuthContextProvider>
          <NotificationContextProvider>
            <Component {...pageProps} />
          </NotificationContextProvider>
        </AuthContextProvider>
      </UpdateCustomerDataContextProvider>
    </ConfirmationContextProvider>
  );
}

export default MyApp;
