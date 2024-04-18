import Link from "next/link";
import { Hats } from "./_components/Hats";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Roles",
  description: "Roles",
});

const HatsPage: NextPage = () => {
  return (
    <>
      <Hats />
      <div className="text-center mt-8 bg-secondary p-10">
        <p>
          Powered by
          <Link
            target="_blank"
            href={"https://www.hatsprotocol.xyz/"}
            className="btn btn-primary btn-sm font-normal gap-1"
          >
            Hats Protocol
          </Link>
        </p>
      </div>
    </>
  );
};

export default HatsPage;
