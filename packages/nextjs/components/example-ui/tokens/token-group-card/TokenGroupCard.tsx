import { TTokenCardPrettifyLoadingProps, Token, TokenCard } from "../token-card/TokenCard";
import { TTokenCardPropertyClasses } from "../token-card/TokenCard";

type TTokenGroupCardProps = {
  tokenGroup: TokenGroup;
  prettifyLoadingProps: TTokenGroupCardPrettifyLoadingProps;
  propertyClasses?: TTokenCardGroupPropertyClasses;
};

export type TokenGroup = {
  token0: Token;
  token1: Token;
};

export type TTokenCardGroupPropertyClasses = {
  card: string;
  container: string;
  tokenCardPropertyClasses?: TTokenCardPropertyClasses;
};

export type TTokenGroupCardPrettifyLoadingProps = {
  card: boolean;
  tokenCardPrettifyLoadingProps: TTokenCardPrettifyLoadingProps;
};

export const TokenGroupCard = ({ tokenGroup, prettifyLoadingProps, propertyClasses }: TTokenGroupCardProps) => {
  return (
    <div className={propertyClasses?.card}>
      {prettifyLoadingProps.card ? (
        tokenGroup.token0.balance !== undefined &&
        tokenGroup.token0.name !== undefined &&
        tokenGroup.token0.description !== undefined &&
        tokenGroup.token0.imageUri !== undefined &&
        tokenGroup.token1.balance !== undefined &&
        tokenGroup.token1.name !== undefined &&
        tokenGroup.token1.description !== undefined &&
        tokenGroup.token1.imageUri !== undefined ? (
          <div className={propertyClasses?.container}>
            <TokenCard
              token={tokenGroup.token0}
              prettifyLoadingProps={prettifyLoadingProps.tokenCardPrettifyLoadingProps}
              propertyClasses={propertyClasses?.tokenCardPropertyClasses}
            />
            <TokenCard
              token={tokenGroup.token1}
              prettifyLoadingProps={prettifyLoadingProps.tokenCardPrettifyLoadingProps}
              propertyClasses={propertyClasses?.tokenCardPropertyClasses}
            />
          </div>
        ) : (
          <>Loading Reputation Tokens...</>
        )
      ) : (
        <>
          <TokenCard token={tokenGroup.token0} propertyClasses={propertyClasses?.tokenCardPropertyClasses} />
          <TokenCard token={tokenGroup.token1} propertyClasses={propertyClasses?.tokenCardPropertyClasses} />
        </>
      )}
    </div>
  );
};
