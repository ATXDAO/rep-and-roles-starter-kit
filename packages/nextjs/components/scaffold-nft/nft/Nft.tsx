"use client";

import { LoadType, RenderableTypes, Size, Style, beautyStyleMap } from "../../../types/scaffold-nft/Types";
import { Address } from "../../scaffold-eth";
import { Attributes } from "./values/Attributes";
import { Descriptor } from "./values/Descriptor";
import { Image } from "./values/Image";
import { Text } from "./values/Text";
import { v4 as uuidv4 } from "uuid";
import { ScaffoldToken } from "~~/types/scaffold-nft/ScaffoldToken";

const sizeMap = {
  base: "w-32 lg:w-96 m-0.5 lg:m-4",
  // base: "max-w-96 lg:max-w-max m-4",
};

type NftProps = {
  token?: ScaffoldToken;
  renderOrder?: RenderableTypes[];
  isLoading?: boolean;
  loadType?: LoadType;
  size?: Size;
  style?: Style;
};

export const Nft = ({
  token,
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
  size = "base",
  style = "rounded",
}: NftProps) => {
  const renderedComponents: any = [];

  for (let i = 0; i < renderOrder.length; i++) {
    let selectedDescriptor;
    let selectedElement;

    selectedDescriptor = renderOrder[i];

    if (renderOrder[i] === "Image") {
      selectedDescriptor = undefined;
      selectedElement = <Image value={token?.metadata?.image?.value} alt={token?.metadata?.image?.alt || ""} />;
    }

    const bigAndBoldTextStyleMap = {
      base: "text-lg m-0 font-bold",
    };

    if (renderOrder[i] === "Token Id") {
      selectedElement = (
        <Text value={token?.id?.toString()} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
      );
    }

    if (renderOrder[i] === "Name") {
      selectedElement = (
        <Text value={token?.metadata?.name} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
      );
    }

    if (renderOrder[i] === "Description") {
      selectedElement = <Text value={token?.metadata?.description} size={size} />;
    }

    if (renderOrder[i] === "Address") {
      const valueStyleMap = {
        base: "xs",
      } as any;

      selectedElement = <Address address={token?.address} size={valueStyleMap[size]} />;
    }

    if (renderOrder[i] === "Collection Name") {
      selectedElement = <Text value={token?.collectionName} size={size} />;
    }
    if (renderOrder[i] === "Collection Symbol") {
      selectedElement = <Text value={token?.collectionSymbol} size={size} />;
    }

    if (renderOrder[i] === "Attributes") {
      selectedElement = <Attributes value={token?.metadata?.attributes} style={style} size={size} />;
    }

    renderedComponents.push(
      <Descriptor key={uuidv4()} style={style} size={size} descriptor={selectedDescriptor}>
        {selectedElement}
      </Descriptor>,
    );
  }

  return (
    <div className={`flex flex-col bg-base-300 ${sizeMap[size]} ${beautyStyleMap[style]}`}>{renderedComponents}</div>
  );
};
