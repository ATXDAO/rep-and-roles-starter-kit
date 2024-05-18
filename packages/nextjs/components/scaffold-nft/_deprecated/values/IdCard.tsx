"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type IdCardProps = {
  value?: bigint;
  uri?: string;
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
  base: "text-lg m-0 font-bold",
};

export const IdCard = ({
  value,
  uri,
  prettyLoad = false,
  style = "rounded",
  showDescriptor,
  size = "base",
}: IdCardProps) => {
  const component = (
    <a href={uri} target="#">
      <p className={`text-center ${valueStyleMap[size]}`}>{value?.toString()}</p>
    </a>
  );

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>Token Id</p> : <></>}
      {output}
    </div>
  );
};
