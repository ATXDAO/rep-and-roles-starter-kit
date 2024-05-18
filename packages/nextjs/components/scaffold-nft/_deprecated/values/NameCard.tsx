"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type NameCardProps = {
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  showDescriptor?: boolean;
  size?: Size;
};

const containerStyleMap = {
  base: "m-1 p-1",
};

const descriptorStyleMap = {
  base: "p-0 m-0 text-xs",
};

const valueStyleMap = {
  base: "text-lg m-0 font-bold",
};

export const NameCard = ({ value, prettyLoad, showDescriptor, style = "rounded", size = "base" }: NameCardProps) => {
  const component = value ? (
    <p className={`text-center ${valueStyleMap[size]}`}>{value}</p>
  ) : (
    <p className={`text-center text-base-100 ${valueStyleMap[size]}`}>{"None"}</p>
  );

  let output;

  if (prettyLoad) {
    output = value ? component : <p className="text-center">Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>Name</p> : <></>}
      {output}
    </div>
  );
};
