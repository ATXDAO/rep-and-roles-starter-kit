import Image from "next/image";
import { ElementClasses } from "../types/Types";

type TImageCardProps = {
  value: string;
  imageProperties?: ImageProperties;
  elementClasses?: ElementClasses;
  prettifyLoading?: boolean;
};

export class ImageProperties {
  alt: string;
  height: number;
  width: number;
  constructor(alt = "", width = 512, height = 512) {
    this.alt = alt;
    this.width = width;
    this.height = height;
  }
}

export const ImageCard = ({ value, imageProperties, prettifyLoading, elementClasses }: TImageCardProps) => {
  const output = (
    <div className={elementClasses?.container}>
      <Image
        className={elementClasses?.value}
        src={value}
        alt={imageProperties?.alt || "Image"}
        width={imageProperties?.width}
        height={imageProperties?.height}
      />
    </div>
  );
  return (
    <div className={elementClasses?.container}>
      {prettifyLoading ? (
        value !== undefined && value !== "" ? (
          output
        ) : (
          <p>Loading Image...</p>
        )
      ) : value !== undefined && value !== "" ? (
        output
      ) : (
        <p></p>
      )}
    </div>
  );
};
