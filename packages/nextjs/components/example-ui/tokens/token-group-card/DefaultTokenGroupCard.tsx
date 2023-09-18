import { TokenGroup } from "../TokenInteractions";
import { TBaseTokenCardBooleanSet } from "../token-card/BaseTokenCard";
import { DefaultTokenCard, TTokenCardPrettifyLoadingProps } from "../token-card/DefaultTokenCard";
import { TTokenCardPropertiesClasses } from "../token-card/DefaultTokenCard";
import { ImageProperties } from "../token-card/ImageCard";

type TTokenGroupCardProps = {
  tokenGroup: TokenGroup;
  imageProperties0: ImageProperties;
  imageProperties1: ImageProperties;
  propertiesClasses?: TTokenCardGroupPropertiesClasses;
  prettifyLoadingProps?: TTokenGroupCardPrettifyLoadingProps;
  renderProps?: TBaseTokenCardBooleanSet;
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
  imageProperties0,
  imageProperties1,
  propertiesClasses,
  prettifyLoadingProps,
  renderProps,
}: TTokenGroupCardProps) => {
  const output = (
    <>
      <DefaultTokenCard
        token={tokenGroup.token0}
        imageProperties={imageProperties0}
        propertiesClasses={propertiesClasses?.tokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps?.tokenCardPrettifyLoadingProps}
        renderProps={renderProps}
      />
      <DefaultTokenCard
        token={tokenGroup.token1}
        imageProperties={imageProperties1}
        propertiesClasses={propertiesClasses?.tokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps?.tokenCardPrettifyLoadingProps}
        renderProps={renderProps}
      />
    </>
  );

  return (
    <div className={propertiesClasses?.card}>
      {prettifyLoadingProps?.card ? (
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
