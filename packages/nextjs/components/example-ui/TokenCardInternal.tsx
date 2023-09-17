import Image from "next/image";

type TTokenProps = {
  imageUri: string;
  balance: bigint;
  name: string;
  description: string;
  prettifyLoadingProps?: TTokenCardInternalPrettifyLoadingProps;
};

export type TTokenCardInternalPrettifyLoadingProps = {
  balance: boolean;
  imageUri: boolean;
  name: boolean;
  description: boolean;
};

export const TokenCardInternal = ({ imageUri, balance, name, description, prettifyLoadingProps }: TTokenProps) => {
  const balanceTextClasses = "w-64 text-4xl text-center font-bai-jamjuree";
  const nameTextClasses = "w-64 text-2xl text-center font-bai-jamjuree";
  const descriptionTextClasses = "w-64 text-1xl text-center font-bai-jamjuree";
  const imageClasses = "w-64 rounded mx-auto";

  return (
    <div className="float-left px-2">
      <div>
        <div className={balanceTextClasses}>
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
      </div>
      {prettifyLoadingProps?.imageUri ? (
        imageUri !== undefined ? (
          <Image className={imageClasses} src={imageUri} alt="Token 0 Image" width="512" height="512" />
        ) : (
          <>Loading Image...</>
        )
      ) : imageUri !== undefined ? (
        <Image className={imageClasses} src={imageUri} alt="Token 0 Image" width="512" height="512" />
      ) : (
        <></>
      )}
      <div className={nameTextClasses}>
        {prettifyLoadingProps?.name ? (name !== undefined ? name : "Loading name...") : name}
      </div>
      <div className={descriptionTextClasses}>
        {prettifyLoadingProps?.description
          ? description !== undefined
            ? description
            : "Loading description..."
          : description}
      </div>
    </div>
  );
};
