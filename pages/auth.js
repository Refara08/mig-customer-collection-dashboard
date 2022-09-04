import Head from "next/head";
import Auth from "../components/auth/Auth";

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>MIG | Login</title>
        <meta
          name="description"
          content="Login page of MIG customer collection database"
        />
      </Head>
      <Auth />
    </>
  );
};

export default AuthPage;
