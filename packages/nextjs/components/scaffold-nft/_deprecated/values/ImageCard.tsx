"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type ImageCardProps = {
  value?: string;
  alt?: string;
  prettyLoad?: boolean;
  size?: Size;
  style?: Style;
  showDescriptor?: boolean;
};

const containerSizeMap = {
  base: "m-1 p-1 lg:m-4 lg:p-4",
};

export const ImageCard = ({
  value,
  alt = "Test",
  prettyLoad = false,
  size = "base",
  style = "rounded",
  showDescriptor = false,
}: ImageCardProps) => {
  /* eslint-disable-next-line*/
  const component = <img src={value} alt={alt} className={`bg-base-300 ${beautyStyleMap[style]}`} />;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading....</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${containerSizeMap[size]} ${beautyStyleMap[style]}`}>
      {showDescriptor ? <p className="text-center">Image</p> : <></>}

      {output}
    </div>
  );
};
