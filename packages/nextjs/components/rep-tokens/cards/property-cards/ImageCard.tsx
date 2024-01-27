import Image from "next/image";
import { ElementClasses } from "../../types/Types";

export interface ImageCardProps {
  props: ImageProps;
}

export interface ImageProps {
  value: string;
  properties?: BaseImageProps;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export class BaseImageProps {
  alt: string;
  height: number;
  width: number;
  constructor(alt = "", width = 512, height = 512) {
    this.alt = alt;
    this.width = width;
    this.height = height;
  }
}

export const ImageCard = ({ props }: ImageCardProps) => {
  const output = (
    <div className={props?.classes?.container}>
      <Image
        className={props?.classes?.value}
        src={props?.value}
        alt={props?.properties?.alt || "Image"}
        width={props?.properties?.width}
        height={props?.properties?.height}
      />
    </div>
  );
  return (
    <div className={props?.classes?.container}>
      {props?.isPrettyLoading ? (
        props?.value !== undefined && props?.value !== "" ? (
          output
        ) : (
          <p>Loading Image...</p>
        )
      ) : props?.value !== undefined && props?.value !== "" ? (
        output
      ) : (
        <p></p>
      )}
    </div>
  );
};
