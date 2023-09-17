import Image from "next/image";

type TImageCardProps = {
  value: string;
  propertyClasses?: string;
  prettifyLoading?: boolean;
};

export const ImageCard = ({ value, prettifyLoading, propertyClasses }: TImageCardProps) => {
  return (
    <div>
      {prettifyLoading ? (
        value !== undefined ? (
          <Image className={propertyClasses} src={value} alt="Token 0 Image" width="512" height="512" />
        ) : (
          <>Loading Image...</>
        )
      ) : value !== undefined ? (
        <Image className={propertyClasses} src={value} alt="Token 0 Image" width="512" height="512" />
      ) : (
        <></>
      )}
    </div>
  );
};
