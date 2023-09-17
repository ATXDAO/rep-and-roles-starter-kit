import Image from "next/image";

type TImageCardProps = {
  value: string;
  imageProperties: ImageProperties;
  propertyClasses?: string;
  prettifyLoading?: boolean;
};

export class ImageProperties {
  value: string;
  alt: string;
  height: number;
  width: number;
  constructor(value = "", alt = "", width = 512, height = 512) {
    this.value = value;
    this.alt = alt;
    this.width = width;
    this.height = height;
  }
}

export const ImageCard = ({ imageProperties, prettifyLoading, propertyClasses }: TImageCardProps) => {
  console.log(imageProperties.value);

  const output = (
    <>
      <Image
        className={propertyClasses}
        src={imageProperties.value}
        alt={imageProperties.alt}
        width={imageProperties.width}
        height={imageProperties.height}
      />
    </>
  );
  return (
    <div>
      {prettifyLoading ? (
        imageProperties.value !== undefined && imageProperties.value !== "" ? (
          output
        ) : (
          <>Loading Image...</>
        )
      ) : imageProperties.value !== undefined && imageProperties.value !== "" ? (
        output
      ) : (
        <></>
      )}
    </div>
  );
};
