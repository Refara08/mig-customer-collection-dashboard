import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/layout/Layout";
import Home from "../components/home/Home";

import authContext from "../store/auth-context";

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
    return <p>You need to login to access this page</p>;
  }

  return (
    <Layout>
      <Home />
    </Layout>
  );
}
