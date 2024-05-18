"use client";

import { useEffect, useState } from "react";
import { Size, Style, beautyStyleMap } from "../types/Types";

export type AttributesCardProps = {
  value?: { trait_type: string; value: string }[];
  style?: Style;
  size?: Size;

  prettyLoad?: boolean;
  showDescriptor?: boolean;
};

export const AttributesCard = ({
  value,
  prettyLoad = false,
  showDescriptor,
  style = "rounded",
  size = "base",
}: AttributesCardProps) => {
  const containerStyleMap = {
    base: "m-1 p-1",
  };

  const descriptorStyleMap = {
    base: "p-0 m-0 text-xs",
  };

  const [sizeLayout, setSizeLayout] = useState(window.innerWidth < 720 ? "flex-col" : "flex-wrap");

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setSizeLayout("flex-col");
    } else {
      setSizeLayout("flex-wrap");
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const attributesContainerStyleMap = {
    base: `${sizeLayout}`,
    //large: flex-wrap
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

  let output;

  if (prettyLoad) {
    output = value ? components : <p>Loading</p>;
  } else {
    output = components;
  }

  return (
    <div className={`bg-base-200 ${containerStyleMap[size]} ${beautyStyleMap[style]}`}>
      {showDescriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>Attributes</p> : <></>}
      <div className={`flex ${attributesContainerStyleMap[size]} justify-center`}>{output}</div>
    </div>
  );
};
