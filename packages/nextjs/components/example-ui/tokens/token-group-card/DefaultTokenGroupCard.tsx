import { Token } from "../TokenInteractions";
import { TBaseTokenCardBooleanSet } from "../token-card/BaseTokenCard";
import { DefaultTokenCard, TTokenCardPrettifyLoadingProps } from "../token-card/DefaultTokenCard";
import { TTokenCardPropertiesClasses } from "../token-card/DefaultTokenCard";
import { ImageProperties } from "../token-card/ImageCard";

type TTokenGroupCardProps = {
  tokens: Token[];
  imageProperties: ImageProperties;
  propertiesClasses?: TTokenCardGroupPropertiesClasses;
  // prettifyLoadingProps?: TTokenGroupCardPrettifyLoadingProps;
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
  tokens,
  imageProperties,
  propertiesClasses,
  // prettifyLoadingProps,
  renderProps,
}: TTokenGroupCardProps) => {
  const components = tokens.map((token, index) => (
    <DefaultTokenCard
      key={`${token.id}+${index}`}
      token={token}
      imageProperties={imageProperties}
      propertiesClasses={propertiesClasses?.tokenCardPropertyClasses}
      // prettifyLoadingProps={prettifyLoadingProps?.tokenCardPrettifyLoadingProps}
      renderProps={renderProps}
    ></DefaultTokenCard>
  ));

  return (
    <div className={propertiesClasses?.card}>
      <div className={propertiesClasses?.container}>{components}</div>
    </div>
    // <div className={propertiesClasses?.card}>
    //   {prettifyLoadingProps?.card ? (
    //     tokenGroup.token0.balance !== undefined &&
    //     tokenGroup.token0.name !== undefined &&
    //     tokenGroup.token0.description !== undefined &&
    //     tokenGroup.token0.image !== undefined &&
    //     tokenGroup.token1.balance !== undefined &&
    //     tokenGroup.token1.name !== undefined &&
    //     tokenGroup.token1.description !== undefined &&
    //     tokenGroup.token1.image !== undefined ? (
    //       <div className={propertiesClasses?.container}>{output}</div>
    //     ) : (
    //       <>Loading Reputation Tokens...</>
    //     )
    //   ) : (
    //     <div className={propertiesClasses?.container}>{output}</div>
    //   )}
    // </div>
  );
};
