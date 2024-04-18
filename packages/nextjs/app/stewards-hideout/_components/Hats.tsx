"use client";

import Link from "next/link";

export function Hats() {
  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <p>Welcome Steward!</p>
        <p> {"You have entered a restricted zone only accesible to wearers of the Stewards's Cap!"}</p>

        <div className="flex space-x-5">
          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">
            Meeting Recordings
          </Link>

          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">
            Financial Roadmap
          </Link>
        </div>

        <div className="flex space-x-5">
          <Link className="btn btn-secondary btn-sm font-normal gap-1" href="#">
            Gain access to gated Discord channels
          </Link>

          <Link className="btn btn-secondary btn-sm font-normal gap-1" href="#">
            Join ATX DAO Internal Telegram
          </Link>

          <Link
            target="_blank"
            href={"https://www.hatsprotocol.xyz/"}
            className="btn btn-secondary btn-sm font-normal gap-1"
          >
            Become multi-sig signer
          </Link>

          <Link
            target="_blank"
            href={"https://www.hatsprotocol.xyz/"}
            className="btn btn-secondary btn-sm font-normal gap-1"
          >
            Receive Administration over Snapshot
          </Link>
        </div>
      </div>
    </>
  );
}
