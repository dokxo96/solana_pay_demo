import type { NextPage } from "next";
import Head from "next/head";
import { BasicPayView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
      <BasicPayView />
    </div>
  );
};

export default Basics;
