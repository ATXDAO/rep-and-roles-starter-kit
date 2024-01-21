import { Token } from "../Hooks";
import { TBaseTokenCardBooleanSet } from "../token-card/BaseTokenCard";
import { DefaultTokenCard, TTokenCardPrettifyLoadingProps } from "../token-card/DefaultTokenCard";
import { TTokenCardPropertiesClasses } from "../token-card/DefaultTokenCard";
import { ImageProperties } from "../token-card/ImageCard";
import { Address } from "~~/components/scaffold-eth";

type TTokenGroupCardProps = {
  tokensData: { address: string; tokens: Token[] };
  imageProperties: ImageProperties;
  propertiesClasses?: TTokenCardGroupPropertiesClasses;
  prettifyLoadingProps?: TTokenGroupCardPrettifyLoadingProps;
  renderProps?: TTokensCardRenderProps;
};

export type TTokenCardGroupPropertiesClasses = {
  card: string;
  container: string;
  adddress: string;
  tokenCardPropertyClasses?: TTokenCardPropertiesClasses;
};

export type TTokenGroupCardPrettifyLoadingProps = {
  card: boolean;
  tokenCardPrettifyLoadingProps: TTokenCardPrettifyLoadingProps;
};

export type TTokensCardRenderProps = {
  address: boolean;
  tokenCardRenderProps: TBaseTokenCardBooleanSet;
};

export const TokensCard = ({
  tokensData,
  imageProperties,
  propertiesClasses,
  prettifyLoadingProps,
  renderProps,
}: TTokenGroupCardProps) => {
  const components = tokensData.tokens.map((token, index) => (
    <DefaultTokenCard
      key={`${token.id}+${index}`}
      token={token}
      imageProperties={imageProperties}
      propertiesClasses={propertiesClasses?.tokenCardPropertyClasses}
      prettifyLoadingProps={prettifyLoadingProps?.tokenCardPrettifyLoadingProps}
      renderProps={renderProps?.tokenCardRenderProps}
    ></DefaultTokenCard>
  ));

  let output;

  if (prettifyLoadingProps) {
    if (prettifyLoadingProps?.card) {
      let isLoaded = true;
      for (let i = 0; i < tokensData.tokens.length; i++) {
        if (
          tokensData.tokens[i].balance === undefined &&
          tokensData.tokens[i].name === undefined &&
          tokensData.tokens[i].description === undefined &&
          tokensData.tokens[i].image === undefined &&
          tokensData.tokens[i].properties === undefined
        ) {
          isLoaded = false;
          break;
        }
      }

      if (tokensData.tokens.length === 0) isLoaded = !isLoaded;

      if (!isLoaded) {
        output = <>Loading Reputation Tokens...</>;
      } else output = components;
    } else {
      output = components;
    }
  } else {
    output = components;
  }

  return (
    <>
      <div className={propertiesClasses?.card}>
        {renderProps?.address ? <Address address={tokensData.address}></Address> : <></>}

        <div className={propertiesClasses?.container}>{output}</div>
      </div>
    </>
  );
};
