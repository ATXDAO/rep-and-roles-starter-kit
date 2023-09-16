import Image from "next/image";

type TTokenProps = {
  imageUri: string;
  balance: bigint;
  name: string;
  description: string;
  prettifyLoadingProps: TTokenCardInternalPrettifyLoadingProps;
};

export type TTokenCardInternalPrettifyLoadingProps = {
  balance: boolean;
  imageUri: boolean;
  name: boolean;
  description: boolean;
};

export const TokenCardInternal = ({ imageUri, balance, name, description, prettifyLoadingProps }: TTokenProps) => {
  return (
    <div className="float-left px-2">
      <div className="grid w-64 h-26 rounded text-secondary-content place-content-center">
        <div className="text-4xl text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {prettifyLoadingProps.balance ? (
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

      <div className="grid w-64 h-64 rounded bg-primary text-primary-content place-content-center">
        <div className="avatar">
          <div className="w-64 rounded">
            {prettifyLoadingProps.imageUri ? (
              imageUri !== undefined ? (
                <Image src={imageUri} alt="Token 0 Image" width="512" height="512" />
              ) : (
                <>Loading Image...</>
              )
            ) : imageUri !== undefined ? (
              <Image src={imageUri} alt="Token 0 Image" width="512" height="512" />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="grid w-64 h-8 rounded text-accent-content place-content-center">
        <div className="text-2xl text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {prettifyLoadingProps.name ? (name !== undefined ? name : "Loading name...") : name}
        </div>
      </div>
      <div className="grid w-64 h-26 rounded text-secondary-content place-content-center">
        <div className="text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {prettifyLoadingProps.description
            ? description !== undefined
              ? description
              : "Loading description..."
            : description}
        </div>
      </div>
    </div>
  );
};
