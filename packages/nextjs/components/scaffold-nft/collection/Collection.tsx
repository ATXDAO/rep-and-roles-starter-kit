"use client";

import React from "react";
// import "react-dropdown/style.css";
import { CollectionDetails } from "~~/components/scaffold-nft/collection/CollectionDetails";
import { Nft } from "~~/components/scaffold-nft/nft/Nft";

type CollectionProps = {
  collection: any;
  isLoading: any;
  isError: any;
  renderOrder?: any;
};

export const Collection = ({
  collection,
  isLoading,
  isError,
  renderOrder = [
    "Image",
    "Token Id",
    "Name",
    "Description",
    "Attributes",
    "Address",
    "Collection Name",
    "Collection Symbol",
  ],
}: CollectionProps) => {
  const tokensComponents = collection?.tokens?.map((token: any, index: number) => {
    return <Nft key={index} token={token} renderOrder={renderOrder} />;
  });

  let mainContent;
  if (isLoading) {
    mainContent = <p>Loading Collection...</p>;
  } else {
    if (isError) {
      mainContent = <p>There was an error. Please try changing the advanced settings.</p>;
    } else {
      mainContent = (
        <>
          <div className="w-full">
            <CollectionDetails collection={collection} renderOrder={["Address"]} />
          </div>
          <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded lg:max-w-[1300px]">
            {tokensComponents}
          </div>
        </>
      );
    }
  }

  return <div className="flex flex-col items-center justify-center">{mainContent}</div>;
};
