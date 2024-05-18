"use client";

import React from "react";
import "react-dropdown/style.css";
import { NftCard } from "~~/components/scaffold-nft/_deprecated/NftCard";
import { AddressCard, AddressCardProps } from "~~/components/scaffold-nft/_deprecated/values/AddressCard";
import {
  CollectionNameCard,
  CollectionNameCardProps,
} from "~~/components/scaffold-nft/_deprecated/values/CollectionNameCard";
import {
  CollectionSymbolCard,
  CollectionSymbolCardProps,
} from "~~/components/scaffold-nft/_deprecated/values/CollectionSymbolCard";
import { CollectionDetails } from "~~/components/scaffold-nft/_deprecated/values/extensions/CollectionDetails";

const AddressCardComponent = (props: AddressCardProps) => {
  return <AddressCard {...props} bgColor="bg-base-300" />;
};

const CollectionNameCardComponent = (props: CollectionNameCardProps) => {
  return <CollectionNameCard {...props} bgColor="bg-base-300" />;
};

const CollectionSymbolCardComponent = (props: CollectionSymbolCardProps) => {
  return <CollectionSymbolCard {...props} bgColor="bg-base-300" />;
};

type Props = {
  collection: any;
  isLoading: any;
  isError: any;
  renderOrder: any;
};

export const CollectionCard = ({ collection, isLoading, isError, renderOrder }: Props) => {
  const tokensComponents = collection?.tokens?.map((token: any, index: number) => {
    return <NftCard key={index} token={token} renderOrder={renderOrder} />;
  });

  let mainContent;
  if (isLoading) {
    mainContent = <p>Loading...</p>;
  } else {
    if (isError) {
      mainContent = <p>There was an error. Please try changing the advanced settings.</p>;
    } else {
      mainContent = tokensComponents;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <CollectionDetails
          token={collection?.tokens[0]}
          showDescriptor={true}
          bgColor="bg-base-100"
          AddressCard={AddressCardComponent}
          CollectionNameCard={CollectionNameCardComponent}
          CollectionSymbolCard={CollectionSymbolCardComponent}
        />
      </div>
      <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded lg:max-w-[1300px]">{mainContent}</div>{" "}
    </div>
  );
};
