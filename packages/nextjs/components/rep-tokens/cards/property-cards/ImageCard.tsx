import Image from "next/image";
import { ElementClasses } from "../../types/Types";

export interface ImageCardProps {
  value: string;
  properties?: ImageProperties;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

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

export const ImageCard = ({ value, properties, classes, isPrettyLoading }: ImageCardProps) => {
  const output = (
    <div className={classes?.container}>
      <Image
        className={classes?.value}
        src={value}
        alt={properties?.alt || "Image"}
        width={properties?.width}
        height={properties?.height}
      />
    </div>
  );
  return (
    <div className={classes?.container}>
      {isPrettyLoading ? (
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
