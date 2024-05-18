"use client";

import { Size, Style, beautyStyleMap } from "../../../../types/scaffold-nft/Types";

export type DescriptorProps = {
  descriptor?: string;
  style?: Style;
  size?: Size;
  children?: any;
  bgColor?: string;
};

const containerStyleMap = {
  base: "m-1 p-1",
};

const descriptorStyleMap = {
  base: "p-0 m-0 text-xs",
};

export const Descriptor = ({
  descriptor = undefined,
  style = "rounded",
  size = "base",
  bgColor = "bg-base-200",
  children,
}: DescriptorProps) => {
  return (
    <div className={`${bgColor} ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>
      {descriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>{descriptor}</p> : <></>}
      <div className="flex justify-center">{children} </div>
    </div>
  );
};
