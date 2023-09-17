import { TTokenCardPrettifyLoadingProps, Token, TokenCard } from "../token-card/TokenCard";
import { TTokenCardPropertiesClasses } from "../token-card/TokenCard";

type TTokenGroupCardProps = {
  tokenGroup: TokenGroup;
  propertiesClasses?: TTokenCardGroupPropertiesClasses;
  prettifyLoadingProps: TTokenGroupCardPrettifyLoadingProps;
};

export type TokenGroup = {
  token0: Token;
  token1: Token;
};

export type TTokenCardGroupPropertiesClasses = {
  card: string;
  container: string;
  tokenCardPropertyClasses?: TTokenCardPropertiesClasses;
};

export type TTokenGroupCardPrettifyLoadingProps = {
  card: boolean;
  tokenCardPrettifyLoadingProps: TTokenCardPrettifyLoadingProps;
};

export const TokenGroupCard = ({ tokenGroup, propertiesClasses, prettifyLoadingProps }: TTokenGroupCardProps) => {
  const output = (
    <>
      <TokenCard
        token={tokenGroup.token0}
        propertiesClasses={propertiesClasses?.tokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps.tokenCardPrettifyLoadingProps}
      />
      <TokenCard
        token={tokenGroup.token1}
        propertiesClasses={propertiesClasses?.tokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps.tokenCardPrettifyLoadingProps}
      />
    </>
  );

  return (
    <div className={propertiesClasses?.card}>
      {prettifyLoadingProps.card ? (
        tokenGroup.token0.balance !== undefined &&
        tokenGroup.token0.name !== undefined &&
        tokenGroup.token0.description !== undefined &&
        tokenGroup.token0.image !== undefined &&
        tokenGroup.token1.balance !== undefined &&
        tokenGroup.token1.name !== undefined &&
        tokenGroup.token1.description !== undefined &&
        tokenGroup.token1.image !== undefined ? (
          <div className={propertiesClasses?.container}>{output}</div>
        ) : (
          <>Loading Reputation Tokens...</>
        )
      ) : (
        <div className={propertiesClasses?.container}>{output}</div>
      )}
    </div>
  );
};
