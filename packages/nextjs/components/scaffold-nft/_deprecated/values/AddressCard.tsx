"use client";

import { Address } from "../../../scaffold-eth";
import { Size, Style, beautyStyleMap } from "../types/Types";

export type AddressCardProps = {
  value?: string;
  style?: Style;
  size?: Size;
  showDescriptor?: boolean;
  descriptorText?: string;
  bgColor?: string;
};

const containerStyleMap = {
  base: "my-1 mx-1 p-1",
};

const descriptorStyleMap = {
  base: "p-0 m-0 text-xs",
};

const valueStyleMap = {
  base: "xs",
} as any;

export const AddressCard = ({
  value,
  style = "rounded",
  size = "base",
  showDescriptor,
  descriptorText = "Contract Address",
  bgColor = "bg-base-200",
}: AddressCardProps) => {
  const component = (
    <div className="flex justify-center">
      <Address address={value} size={valueStyleMap[size]} />
    </div>
  );

  return (
    <div className={`${bgColor} ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>{descriptorText}</p> : <></>}
      {component}
    </div>
  );
};
