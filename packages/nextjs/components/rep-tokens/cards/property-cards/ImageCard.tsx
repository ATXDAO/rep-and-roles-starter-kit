import Image from "next/image";
import { PropertyClasses } from "../types/Types";

type TImageCardProps = {
  value: string;
  imageProperties?: ImageProperties;
  propertyClasses?: PropertyClasses;
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

export const ImageCard = ({ value, imageProperties, prettifyLoading, propertyClasses }: TImageCardProps) => {
  const output = (
    <div className={propertyClasses?.container}>
      <Image
        className={propertyClasses?.value}
        src={value}
        alt={imageProperties?.alt || "Image"}
        width={imageProperties?.width}
        height={imageProperties?.height}
      />
    </div>
  );
  return (
    <div className={propertyClasses?.container}>
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
