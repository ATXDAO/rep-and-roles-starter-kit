"use client";

import { RepTokensDemo } from "./rep-tokens-demo/_components/RepTokensDemo";
import type { NextPage } from "next";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { data: repTokensInstance } = useScaffoldContract({ contractName: "ReputationTokensStandalone" });

  return (
    <>
      {repTokensInstance ? (
        <RepTokensDemo />
      ) : (
        <p className="text-4xl text-bold text-center p-10 m-10">
          You have not deployed any smart contracts! Head over to the README.md to find out how!
        </p>
      )}
    </>
  );
};

export default Home;
