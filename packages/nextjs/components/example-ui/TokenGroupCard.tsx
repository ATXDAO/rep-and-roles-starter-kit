import { TTokenCardPrettifyLoadingProps, Token, TokenCard } from "./TokenCard";

type TTokenGroupCardProps = {
  tokenGroup: TokenGroup;
  prettifyLoadingProps: TTokenGroupCardPrettifyLoadingProps;
};

export type TokenGroup = {
  token0: Token;
  token1: Token;
};

export type TTokenGroupCardPrettifyLoadingProps = {
  groupCard: boolean;
  tokenCardPrettifyLoadingProps: TTokenCardPrettifyLoadingProps;
};

export const TokenGroupCard = ({ tokenGroup, prettifyLoadingProps }: TTokenGroupCardProps) => {
  return (
    <div className="flex bg-base-300">
      <div>
        {prettifyLoadingProps.groupCard ? (
          tokenGroup.token0.balance !== undefined &&
          tokenGroup.token0.name !== undefined &&
          tokenGroup.token0.description !== undefined &&
          tokenGroup.token0.imageUri !== undefined &&
          tokenGroup.token1.balance !== undefined &&
          tokenGroup.token1.name !== undefined &&
          tokenGroup.token1.description !== undefined &&
          tokenGroup.token1.imageUri !== undefined ? (
            <>
              <TokenCard
                token={tokenGroup.token0}
                prettifyLoadingProps={prettifyLoadingProps.tokenCardPrettifyLoadingProps}
              />
              <TokenCard
                token={tokenGroup.token1}
                prettifyLoadingProps={prettifyLoadingProps.tokenCardPrettifyLoadingProps}
              />
            </>
          ) : (
            <>Loading Reputation Tokens...</>
          )
        ) : (
          <>
            <TokenCard token={tokenGroup?.token0} />
            <TokenCard token={tokenGroup?.token1} />
          </>
        )}
      </div>
    </div>
  );
};
