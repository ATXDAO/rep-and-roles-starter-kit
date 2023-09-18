import Image from "next/image";

type TImageCardProps = {
  value: string;
  imageProperties?: ImageProperties;
  propertyClasses?: string;
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
    <>
      <Image
        className={propertyClasses}
        src={value}
        alt={imageProperties?.alt || "Image"}
        width={imageProperties?.width}
        height={imageProperties?.height}
      />
    </>
  );
  return (
    <div>
      {prettifyLoading ? (
        value !== undefined && value !== "" ? (
          output
        ) : (
          <>Loading Image...</>
        )
      ) : value !== undefined && value !== "" ? (
        output
      ) : (
        <></>
      )}
    </div>
  );
};
