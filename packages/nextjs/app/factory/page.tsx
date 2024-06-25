import { Factory } from "./_components/Factory";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Factory",
  description: "Factory",
});

const FactoryPage: NextPage = () => {
  return (
    <>
      <Factory />
    </>
  );
};

export default FactoryPage;
