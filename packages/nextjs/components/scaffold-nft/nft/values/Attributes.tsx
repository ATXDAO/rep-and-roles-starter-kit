"use client";

import { useEffect, useState } from "react";
import { Size, Style, beautyStyleMap } from "../../../../types/scaffold-nft/Types";

export type AttributesProps = {
  value?: { trait_type: string; value: string }[];
  style?: Style;
  size?: Size;
};

const attributeContainerStyleMap = {
  base: "my-1 lg:mx-4 lg:p-4 lg:w-[150px]",
};

const attributeTraitTypeStyleMap = {
  base: "m-0 text-sm",
};

const attributeValueStyleMap = {
  base: "m-0 text-md",
};

export const Attributes = ({
  value,

  style = "rounded",
  size = "base",
}: AttributesProps) => {
  const [sizeLayout, setSizeLayout] = useState(window.innerWidth < 720 ? "flex-col" : "flex-wrap");

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setSizeLayout("flex-col");
    } else {
      setSizeLayout("flex-wrap");
    }
  };

  const attributesContainerStyleMap = {
    base: `${sizeLayout}`,
  };

  const components = value?.map((attribute: any, index: number) => {
    return (
      <div
        key={index}
        className={`bg-base-100 text-center ${attributeContainerStyleMap[size]} ${beautyStyleMap[style]}`}
      >
        <p className={`${attributeTraitTypeStyleMap[size]}`}>{attribute["trait_type"]}</p>
        <p className={`${attributeValueStyleMap[size]}`}>{attribute["value"]}</p>
      </div>
    );
  });

  return <div className={`flex ${attributesContainerStyleMap[size]} justify-center`}>{components}</div>;
};
