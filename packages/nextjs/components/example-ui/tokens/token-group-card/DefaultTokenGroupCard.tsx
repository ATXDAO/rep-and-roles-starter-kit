import { DefaultTokenCard, TTokenCardPrettifyLoadingProps, Token } from "../token-card/DefaultTokenCard";
import { TTokenCardPropertiesClasses } from "../token-card/DefaultTokenCard";

type TTokenGroupCardProps = {
  tokenGroup: TokenGroup;
  propertiesClasses?: TTokenCardGroupPropertiesClasses;
  prettifyLoadingProps?: TTokenGroupCardPrettifyLoadingProps;
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

export const DefaultTokenGroupCard = ({
  tokenGroup,
  propertiesClasses,
  prettifyLoadingProps,
}: TTokenGroupCardProps) => {
  const output = (
    <>
      <DefaultTokenCard
        token={tokenGroup.token0}
        propertiesClasses={propertiesClasses?.tokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps?.tokenCardPrettifyLoadingProps}
      />
      <DefaultTokenCard
        token={tokenGroup.token1}
        propertiesClasses={propertiesClasses?.tokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps?.tokenCardPrettifyLoadingProps}
      />
    </>
  );

  return (
    <div className={propertiesClasses?.card}>
      {prettifyLoadingProps?.card ? (
        tokenGroup.token0.balance !== undefined &&
        tokenGroup.token0.name !== undefined &&
        tokenGroup.token0.description !== undefined &&
        tokenGroup.token0.imageProperties.value !== undefined &&
        tokenGroup.token1.balance !== undefined &&
        tokenGroup.token1.name !== undefined &&
        tokenGroup.token1.description !== undefined &&
        tokenGroup.token1.imageProperties.value !== undefined ? (
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
