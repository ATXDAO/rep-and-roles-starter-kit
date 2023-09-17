import Image from "next/image";

type TTokenProps = {
  imageUri: string;
  balance: bigint;
  name: string;
  description: string;
  prettifyLoadingProps?: TTokenCardInternalPrettifyLoadingProps;
  infoClasses?: TInfoClasses;
};

export type TInfoClasses = {
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

export const TokenCardInternalSmall = ({
  imageUri,
  balance,
  name,
  description,
  prettifyLoadingProps,
  infoClasses,
}: TTokenProps) => {
  // const balanceTextClasses = "w-32 text-2xl mx-auto text-center";
  // const nameTextClasses = "w-32 text-1xl text-center object-center mx-auto font-bold";
  // const descriptionTextClasses = "w-32 text-1xl mx-auto text-center";
  // const imageClasses = "w-32 rounded mx-auto";

  return (
    <div>
      <div className={infoClasses?.balance}>
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
          <Image className={infoClasses?.image} src={imageUri} alt="Token 0 Image" width="512" height="512" />
        ) : (
          <>Loading Image...</>
        )
      ) : imageUri !== undefined ? (
        <Image className={infoClasses?.image} src={imageUri} alt="Token 0 Image" width="512" height="512" />
      ) : (
        <></>
      )}
      <div className={infoClasses?.name}>
        {prettifyLoadingProps?.name ? (name !== undefined ? name : "Loading name...") : name}
      </div>
      <div className={infoClasses?.description}>
        {prettifyLoadingProps?.description
          ? description !== undefined
            ? description
            : "Loading description..."
          : description}
      </div>
    </div>
  );
};
