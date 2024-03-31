import Image from "next/image";
import { Color } from "./Stylized";

export interface ImageCardPropsInternal {
  src: string;
  alt?: string;
  imageClassName?: string;
  color?: Color;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
}

const sizeMap = {
  xs: 32,
  sm: 64,
  base: 256,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

const cardSizeMap = {
  xs: "p-1",
  sm: "p-2",
  base: "p-2",
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

export const StylizedImageCard = ({
  src,
  alt = "Token Image",
  size = "base",
  color = "slate",
}: ImageCardPropsInternal) => {
  return (
    <div className={`rounded-lg bg-${color}-300 ${cardSizeMap[size]}`}>
      <Image className="rounded-lg mx-auto" src={src} alt={alt} width={sizeMap[size]} height={sizeMap[size]} />
    </div>
  );
};
