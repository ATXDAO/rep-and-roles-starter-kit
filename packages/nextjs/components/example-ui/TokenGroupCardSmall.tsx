import { TInfoClasses } from "./TokenCardInternalSmall";
import { TTokenCardPrettifyLoadingProps, Token, TokenCardSmall } from "./TokenCardSmall";

type TTokenGroupCardProps = {
  tokenGroup: TokenGroup;
  prettifyLoadingProps: TTokenGroupCardPrettifyLoadingProps;
  infoClasses?: TInfoClasses;
};

export type TokenGroup = {
  token0: Token;
  token1: Token;
};

export type TTokenGroupCardPrettifyLoadingProps = {
  groupCard: boolean;
  tokenCardPrettifyLoadingProps: TTokenCardPrettifyLoadingProps;
};

export const TokenGroupCardSmall = ({ tokenGroup, prettifyLoadingProps, infoClasses }: TTokenGroupCardProps) => {
  return (
    <div className="bg-base-300">
      {prettifyLoadingProps.groupCard ? (
        tokenGroup.token0.balance !== undefined &&
        tokenGroup.token0.name !== undefined &&
        tokenGroup.token0.description !== undefined &&
        tokenGroup.token0.imageUri !== undefined &&
        tokenGroup.token1.balance !== undefined &&
        tokenGroup.token1.name !== undefined &&
        tokenGroup.token1.description !== undefined &&
        tokenGroup.token1.imageUri !== undefined ? (
          <div className="flex justify-center">
            <TokenCardSmall
              token={tokenGroup.token0}
              prettifyLoadingProps={prettifyLoadingProps.tokenCardPrettifyLoadingProps}
              infoClasses={infoClasses}
            />
            <TokenCardSmall
              token={tokenGroup.token1}
              prettifyLoadingProps={prettifyLoadingProps.tokenCardPrettifyLoadingProps}
              infoClasses={infoClasses}
            />
          </div>
        ) : (
          <>Loading Reputation Tokens...</>
        )
      ) : (
        <>
          <TokenCardSmall token={tokenGroup.token0} infoClasses={infoClasses} />
          <TokenCardSmall token={tokenGroup.token1} infoClasses={infoClasses} />
        </>
      )}
    </div>
  );
};
