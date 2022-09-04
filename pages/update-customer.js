import { useContext } from "react";
import Head from "next/head";

import Layout from "../components/layout/Layout";
import UpdateCustomer from "../components/update-customer/UpdateCustomer";
import updateCustomerDataContext from "../store/update-customer-ctx";

const UpdateCustomerPage = () => {
  const oldData = useContext(updateCustomerDataContext).data;

  return (
    <Layout>
      <Head>
        <title>Update customer</title>
        <meta
          name="description"
          content="update customer data of MIG customer"
        />
      </Head>
      <UpdateCustomer data={oldData} />
    </Layout>
  );
};

export default UpdateCustomerPage;
