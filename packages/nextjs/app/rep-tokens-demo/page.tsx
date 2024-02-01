import { RepTokensDemo } from "./_components/RepTokensDemo";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const RepTokensDemoPage: NextPage = () => {
  return (
    <>
      <RepTokensDemo />
    </>
  );
};

export default RepTokensDemoPage;
