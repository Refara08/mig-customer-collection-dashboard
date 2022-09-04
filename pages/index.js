import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../components/layout/Layout";
import Home from "../components/home/Home";

import authContext from "../store/auth-context";
import LoadingPage from "../components/home/LoadingPage";

export default function HomePage() {
  const router = useRouter();
  const authCtx = useContext(authContext);
  const { isLoggedIn } = authCtx;

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth");
    }
  }, []);

  if (!isLoggedIn) {
    return <LoadingPage />;
  }

  return (
    <Layout>
      <Head>
        <title>MIG Dashboard</title>
        <meta
          name="description"
          content="collection database page of MIG customer"
        />
      </Head>
      <Home />
    </Layout>
  );
}
