"use client";

import { ComponentType } from "react";
import { Size, Style, beautyStyleMap } from "../../types/Types";
import { AddressCard } from "../AddressCard";
import { AddressCardProps } from "../AddressCard";
import { CollectionNameCard } from "../CollectionNameCard";
import { CollectionNameCardProps } from "../CollectionNameCard";
import { CollectionSymbolCard } from "../CollectionSymbolCard";
import { CollectionSymbolCardProps } from "../CollectionSymbolCard";
import { v4 as uuidv4 } from "uuid";
import { ScaffoldToken } from "~~/types/scaffold-nft/ScaffoldToken";

export type CollectionDetailsProps = {
  token?: ScaffoldToken;
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  size?: Size;
  bgColor?: string;

  showDescriptor?: boolean;
  renderOrder?: ("Address" | "CollectionName" | "CollectionSymbol")[];
  AddressCard?: ComponentType<AddressCardProps>;
  CollectionNameCard?: ComponentType<CollectionNameCardProps>;
  CollectionSymbolCard?: ComponentType<CollectionSymbolCardProps>;

  showDescriptors?: {
    detailsDescriptor?: boolean;
    componentsDescriptor?: {
      address?: boolean;
      collectionName?: boolean;
      collectionSymbol?: boolean;
    };
  };
};

const AddressCardComponent = (props: AddressCardProps) => {
  return <AddressCard {...props} />;
};

const CollectionNameCardComponent = (props: CollectionNameCardProps) => {
  return <CollectionNameCard {...props} />;
};

const CollectionSymbolCardComponent = (props: CollectionSymbolCardProps) => {
  return <CollectionSymbolCard {...props} />;
};

const containerStyleMap = {
  base: "m-1 p-1",
};

const descriptorStyleMap = {
  base: "p-0 m-0 text-xs",
};

const valueStyleMap = {
  base: "flex-col m-0",
  //large: flex-wrap
};

export const CollectionDetails = ({
  token,
  prettyLoad,
  style = "rounded",
  showDescriptor,
  size = "base",
  bgColor = "bg-base-200",
  renderOrder = ["Address", "CollectionName", "CollectionSymbol"],
  AddressCard = AddressCardComponent,
  CollectionNameCard = CollectionNameCardComponent,
  CollectionSymbolCard = CollectionSymbolCardComponent,
}: CollectionDetailsProps) => {
  const renderedComponents: any = [];

  for (let i = 0; i < renderOrder.length; i++) {
    if (renderOrder[i] === "Address") {
      renderedComponents.push(
        <AddressCard key={uuidv4()} value={token?.address} showDescriptor={true} bgColor="bg-base-100" size={size} />,
      );
    } else if (renderOrder[i] === "CollectionName") {
      renderedComponents.push(
        <CollectionNameCard
          key={uuidv4()}
          value={token?.collectionName}
          showDescriptor={true}
          bgColor="bg-base-100"
          descriptorText="Name"
          size={size}
        />,
      );
    } else if (renderOrder[i] === "CollectionSymbol") {
      renderedComponents.push(
        <CollectionSymbolCard
          key={uuidv4()}
          value={token?.collectionSymbol}
          showDescriptor={true}
          bgColor="bg-base-100"
          descriptorText="Symbol"
          size={size}
        />,
      );
    }
  }

  const component = (
    <>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>Collection Details</p> : <></>}
      <div className={`flex justify-center ${valueStyleMap[size]}`}>{renderedComponents}</div>
    </>
  );

  let output;

  if (prettyLoad) {
    output =
      token?.collectionName !== undefined && token?.collectionSymbol !== undefined && token?.address !== undefined ? (
        component
      ) : (
        <p>Loading...</p>
      );
  } else {
    output = component;
  }

  return <div className={`${bgColor} ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>{output}</div>;
};
