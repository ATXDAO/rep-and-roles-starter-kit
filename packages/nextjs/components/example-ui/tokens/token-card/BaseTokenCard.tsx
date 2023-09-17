import Image from "next/image";

type TTokenProps = {
  imageUri: string;
  balance: bigint;
  name: string;
  description: string;
  propertyClasses?: TBaseTokenCardPropertyClasses;
  prettifyLoadingProps?: TTokenCardInternalPrettifyLoadingProps;
};

export type TBaseTokenCardPropertyClasses = {
  balance: string;
  name: string;
  description: string;
  image: string;
};

export type TTokenCardInternalPrettifyLoadingProps = {
  balance: boolean;
  imageUri: boolean;
  name: boolean;
  description: boolean;
};

export const BaseTokenCard = ({
  imageUri,
  balance,
  name,
  description,
  prettifyLoadingProps,
  propertyClasses,
}: TTokenProps) => {
  return (
    <div>
      <div className={propertyClasses?.balance}>
        {prettifyLoadingProps?.balance ? (
          balance !== undefined ? (
            Number(balance)
          ) : (
            <>Loading Balance...</>
          )
        ) : balance !== undefined ? (
          Number(balance)
        ) : (
          0
        )}
        {}
      </div>
      {prettifyLoadingProps?.imageUri ? (
        imageUri !== undefined ? (
          <Image className={propertyClasses?.image} src={imageUri} alt="Token 0 Image" width="512" height="512" />
        ) : (
          <>Loading Image...</>
        )
      ) : imageUri !== undefined ? (
        <Image className={propertyClasses?.image} src={imageUri} alt="Token 0 Image" width="512" height="512" />
      ) : (
        <></>
      )}
      <div className={propertyClasses?.name}>
        {prettifyLoadingProps?.name ? (name !== undefined ? name : "Loading name...") : name}
      </div>
      <div className={propertyClasses?.description}>
        {prettifyLoadingProps?.description
          ? description !== undefined
            ? description
            : "Loading description..."
          : description}
      </div>
    </div>
  );
};
