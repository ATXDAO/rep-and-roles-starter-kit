import { TInfoClasses, TTokenCardInternalPrettifyLoadingProps, TokenCardInternalSmall } from "./TokenCardInternalSmall";

export type Token = {
  balance: bigint;
  imageUri: string;
  name: string;
  description: string;
};

type TTokenProps = {
  token: Token;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
  infoClasses?: TInfoClasses;
};

export type TTokenCardPrettifyLoadingProps = {
  card: boolean;
  tokenCardInternalPrettifyLoadingProps: TTokenCardInternalPrettifyLoadingProps;
};

export const TokenCardSmall = ({ token, prettifyLoadingProps, infoClasses }: TTokenProps) => {
  return (
    <div className="px-5">
      {prettifyLoadingProps?.card ? (
        token?.imageUri !== undefined &&
        token?.balance !== undefined &&
        token?.name !== undefined &&
        token?.description !== undefined ? (
          <div>
            <TokenCardInternalSmall
              imageUri={token.imageUri}
              balance={token.balance}
              name={token.name}
              description={token.description}
              prettifyLoadingProps={prettifyLoadingProps.tokenCardInternalPrettifyLoadingProps}
              infoClasses={infoClasses}
            />
          </div>
        ) : (
          <>Loading Token...</>
        )
      ) : (
        <div>
          <TokenCardInternalSmall
            imageUri={token.imageUri}
            balance={token.balance}
            name={token.name}
            description={token.description}
            infoClasses={infoClasses}
          />
        </div>
      )}
    </div>
  );
};
