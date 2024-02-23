import Image from "next/image";
import { CardClasses, IsPrettyLoading } from "../../types/Types";

export class ImageProps {
  alt: string;
  height: number;
  width: number;
  constructor(alt = "", width = 512, height = 512) {
    this.alt = alt;
    this.width = width;
    this.height = height;
  }
}

export interface ImageCardProps {
  value: string;
  properties?: ImageProps;
  classes?: CardClasses;
  isPrettyLoading?: IsPrettyLoading;
}

export interface ImageCardPropsInternal {
  props: ImageCardProps;
}

export const ImageCard = ({ props }: ImageCardPropsInternal) => {
  const output = (
    <div className={props?.classes?.card}>
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
    <div className={props?.classes?.card}>
      {props?.isPrettyLoading ? (
        props?.value !== undefined && props?.value !== "" ? (
          output
        ) : (
          <p className={props?.isPrettyLoading?.classes}>{props?.isPrettyLoading?.message}</p>
        )
      ) : props?.value !== undefined && props?.value !== "" ? (
        output
      ) : (
        <p></p>
      )}
    </div>
  );
};
