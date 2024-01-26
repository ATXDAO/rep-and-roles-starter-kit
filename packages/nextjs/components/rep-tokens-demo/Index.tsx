import { ImageProperties } from "../rep-tokens/cards/property-cards/ImageCard";
import { BaseTokenCardPropertiesBooleanSet } from "../rep-tokens/cards/token-card/BaseTokenCard";
import { TTokenCardPrettifyLoadingProps } from "../rep-tokens/cards/token-card/TokenCard";
import { TTokenCardPropertiesClasses } from "../rep-tokens/cards/token-card/TokenCard";
import { TTokenCardProps } from "../rep-tokens/cards/token-card/TokenCard";
import { TokensCard } from "../rep-tokens/cards/tokens-card/TokensCard";
import { useRepTokens } from "../rep-tokens/hooks/Hooks";
import { Token } from "../rep-tokens/hooks/Hooks";
import {
  tokenCardPrettifyLoadingProps as mainTokenCardPrettifyLoadingProps,
  tokenCardPropertiesClasses as mainTokenCardPropertiesClasses,
  tokenCardRenderProps as mainTokenCardRenderProps,
  tokensCardPrettifyLoadingProps as mainTokensCardPrettifyLoadingProps,
  tokensCardPropertiesClasses as mainTokensCardPropertiesClassess,
  tokensCardRenderProps as mainTokensCardRenderProps,
} from "./MainTokensCardConfig";
import {
  tokenCardPrettifyLoadingProps as mainNumberOverlayTokenCardPrettifyLoadingProps,
  tokenCardPropertiesClasses as mainNumberOverlayTokenCardPropertiesClasses,
  tokenCardRenderProps as mainNumberOverlayTokenCardRenderProps,
  tokensCardPrettifyLoadingProps as mainNumberOverlayTokensCardPrettifyLoadingProps,
  tokensCardPropertiesClasses as mainNumberOverlayTokensCardPropertiesClassess,
  tokensCardRenderProps as mainNumberOverlayTokensCardRenderProps,
} from "./MainTokensCardWithNumberOverlayConfig";
import {
  tokenCardPrettifyLoadingProps as navBarTokenCardPrettifyLoadingProps,
  tokenCardPropertiesClasses as navBarTokenCardPropertiesClasses,
  tokenCardRenderProps as navBarTokenCardRenderProps,
  tokensCardPrettifyLoadingProps as navBarTokensCardPrettifyLoadingProps,
  tokensCardPropertiesClasses as navBarTokensCardPropertiesClassess,
  tokensCardRenderProps as navBarTokensCardRenderProps,
} from "./NavBarCardConfig";
import { useAccount } from "wagmi";

function buildTokensCard(
  tokens: Token[],
  address?: string,
  imageProperties?: ImageProperties,
  propertiesClasses?: TTokenCardPropertiesClasses,
  renderProps?: BaseTokenCardPropertiesBooleanSet,
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps,
) {
  const arr = [];
  for (let i = 0; i < tokens.length; i++) {
    const tokenCardProp: TTokenCardProps = {
      token: tokens[i],
      address,
      imageProperties,
      prettifyLoadingProps: prettifyLoadingProps,
      propertiesClasses,
      renderProps,
    };

    arr.push(tokenCardProp);
  }

  return arr;
}

export const Index = () => {
  const navBarCardImageProperties = new ImageProperties("Token", 64, 64);
  const mainCardImageProperties = new ImageProperties("Token", 256, 256);

  const { address } = useAccount();

  const { tokensData } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  const navBarTokenCard = buildTokensCard(
    tokensData.tokens,
    tokensData.address,
    navBarCardImageProperties,
    navBarTokenCardPropertiesClasses,
    navBarTokenCardRenderProps,
    navBarTokenCardPrettifyLoadingProps,
  );

  const mainTokenCard = buildTokensCard(
    tokensData.tokens,
    tokensData.address,
    mainCardImageProperties,
    mainTokenCardPropertiesClasses,
    mainTokenCardRenderProps,
    mainTokenCardPrettifyLoadingProps,
  );

  const mainNumberOverlayTokenCard = buildTokensCard(
    tokensData.tokens,
    tokensData.address,
    mainCardImageProperties,
    mainNumberOverlayTokenCardPropertiesClasses,
    mainNumberOverlayTokenCardRenderProps,
    mainNumberOverlayTokenCardPrettifyLoadingProps,
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokensCard
            address={tokensData.address}
            tokensProps={navBarTokenCard}
            propertiesClasses={navBarTokensCardPropertiesClassess}
            renderProps={navBarTokensCardRenderProps}
            prettifyLoadingProps={navBarTokensCardPrettifyLoadingProps}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokensCard
            address={tokensData.address}
            tokensProps={mainTokenCard}
            propertiesClasses={mainTokensCardPropertiesClassess}
            renderProps={mainTokensCardRenderProps}
            prettifyLoadingProps={mainTokensCardPrettifyLoadingProps}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokensCard
            address={tokensData.address}
            tokensProps={mainNumberOverlayTokenCard}
            propertiesClasses={mainNumberOverlayTokensCardPropertiesClassess}
            renderProps={mainNumberOverlayTokensCardRenderProps}
            prettifyLoadingProps={mainNumberOverlayTokensCardPrettifyLoadingProps}
          />
        </div>
      </div>
    </>
  );
};
