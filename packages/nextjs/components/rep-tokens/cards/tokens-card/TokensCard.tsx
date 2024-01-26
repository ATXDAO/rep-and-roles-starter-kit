import { DefaultTokenCard, TTokenCardPrettifyLoadingProps } from "../token-card/TokenCard";
import { TTokenCardProps } from "../token-card/TokenCard";
import { PropertyClasses } from "../types/Types";
import { Address } from "~~/components/scaffold-eth";

export type TTokensCardProps = {
  address?: string;
  tokensProps: TTokenCardProps[];
  propertiesClasses?: TTokenCardGroupPropertiesClasses;
  renderProps?: TTokensCardRenderProps;
  prettifyLoadingProps?: TTokenGroupCardPrettifyLoadingProps;
};

export type TTokenCardGroupPropertiesClasses = {
  card: string;
  container: string;
  address: PropertyClasses;
};

export type TTokenGroupCardPrettifyLoadingProps = {
  card: boolean;
  tokenCardPrettifyLoadingProps: TTokenCardPrettifyLoadingProps;
};

export type TTokensCardRenderProps = {
  address: boolean;
};

export const TokensCard = ({
  address,
  tokensProps,
  propertiesClasses,
  renderProps,
  prettifyLoadingProps,
}: TTokensCardProps) => {
  const components = tokensProps.map((tokenProp, index) => (
    <DefaultTokenCard
      key={`${tokenProp.token.id}+${index}`}
      token={tokenProp.token}
      address={tokenProp.address}
      imageProperties={tokenProp.imageProperties}
      propertiesClasses={tokenProp.propertiesClasses}
      prettifyLoadingProps={tokenProp.prettifyLoadingProps}
      renderProps={tokenProp.renderProps}
    ></DefaultTokenCard>
  ));

  let output;

  if (prettifyLoadingProps) {
    if (prettifyLoadingProps?.card) {
      let isLoaded = true;
      for (let i = 0; i < tokensProps.length; i++) {
        if (
          tokensProps[i].token.balance === undefined &&
          tokensProps[i].token.name === undefined &&
          tokensProps[i].token.description === undefined &&
          tokensProps[i].token.image === undefined &&
          tokensProps[i].token.properties === undefined
        ) {
          isLoaded = false;
          break;
        }
      }

      if (tokensProps.length === 0) isLoaded = !isLoaded;

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
        {renderProps?.address ? (
          <Address address={address} propertyClasses={propertiesClasses?.address}></Address>
        ) : (
          <></>
        )}
        <div className={propertiesClasses?.container}>{output}</div>
      </div>
    </>
  );
};
