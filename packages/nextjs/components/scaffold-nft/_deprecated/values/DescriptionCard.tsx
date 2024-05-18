"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type DescriptionCardProps = {
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  size?: Size;
  showDescriptor?: boolean;
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

export const DescriptionCard = ({
  value,
  prettyLoad = false,
  style = "rounded",
  size = "base",

  showDescriptor,
}: DescriptionCardProps) => {
  // const sizeMap = {
  //   sm: "",
  //   base: "max-w-3xl",
  // };

  // const component = <p className={`text-center ${valueStyleMap[size]}`}>{value}</p>;

  const component = value ? (
    <p className={`text-center ${valueStyleMap[size]}`}>{value}</p>
  ) : (
    <p className={`text-center text-base-100 ${valueStyleMap[size]}`}>{"None"}</p>
  );

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>Description</p> : <></>}
      {output}
    </div>
  );
};
