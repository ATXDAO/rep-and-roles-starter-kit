import { TTokenCardInternalPrettifyLoadingProps, TokenCardInternal } from "./TokenCardInternal";

export type Token = {
  balance: bigint;
  imageUri: string;
  name: string;
  description: string;
};

type TTokenProps = {
  token: Token;
  prettifyLoadingProps: TTokenCardPrettifyLoadingProps;
};

export type TTokenCardPrettifyLoadingProps = {
  card: boolean;
  tokenCardInternalPrettifyLoadingProps: TTokenCardInternalPrettifyLoadingProps;
};

export const TokenCard = ({ token, prettifyLoadingProps }: TTokenProps) => {
  return (
    <>
      {prettifyLoadingProps.card ? (
        token?.imageUri !== undefined &&
        token?.balance !== undefined &&
        token?.name !== undefined &&
        token?.description !== undefined ? (
          <>
            <TokenCardInternal
              imageUri={token.imageUri}
              balance={token.balance}
              name={token.name}
              description={token.description}
              prettifyLoadingProps={prettifyLoadingProps.tokenCardInternalPrettifyLoadingProps}
            />
          </>
        ) : (
          <>Loading Token...</>
        )
      ) : (
        <>
          <TokenCardInternal
            imageUri={token.imageUri}
            balance={token.balance}
            name={token.name}
            description={token.description}
            prettifyLoadingProps={prettifyLoadingProps.tokenCardInternalPrettifyLoadingProps}
          />
        </>
      )}
    </>
  );
};
