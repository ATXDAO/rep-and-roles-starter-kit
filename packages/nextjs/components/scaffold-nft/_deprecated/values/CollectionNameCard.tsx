"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type CollectionNameCardProps = {
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  size?: Size;

  showDescriptor?: boolean;
  descriptorText?: string;
  bgColor?: string;
};

const containerStyleMap = {
  base: "m-1 p-1",
};

const descriptorStyleMap = {
  base: "p-0 m-0 text-xs",
};

const valueStyleMap = {
  base: "text-md m-0",
};

export const CollectionNameCard = ({
  value,
  prettyLoad = false,
  style = "rounded",
  size = "base",
  showDescriptor,
  descriptorText = "Collection Name",
  bgColor = "bg-base-200",
}: CollectionNameCardProps) => {
  const component = <p className={`text-center break-words hyphens-auto ${valueStyleMap[size]}`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`${bgColor} ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>{descriptorText}</p> : <></>}
      {output}
    </div>
  );
};
