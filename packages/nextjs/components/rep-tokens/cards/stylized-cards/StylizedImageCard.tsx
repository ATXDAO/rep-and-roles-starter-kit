import Image from "next/image";

export interface ImageCardPropsInternal {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  imageClassName?: string;
}

export const StylizedImageCard = ({ src, alt = "Token Image", width = 512, height = 512 }: ImageCardPropsInternal) => {
  return <Image className="rounded-lg mx-auto" src={src} alt={alt} width={width} height={height} />;
};
