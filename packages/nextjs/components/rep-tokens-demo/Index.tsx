import { useRepTokens } from "./tokens/Hooks";
import { Token } from "./tokens/Hooks";
import { TBaseTokenCardBooleanSet } from "./tokens/token-card/BaseTokenCard";
import { ImageProperties } from "./tokens/token-card/ImageCard";
import { TTokenCardPrettifyLoadingProps } from "./tokens/token-card/TokenCard";
import { TTokenCardPropss } from "./tokens/token-card/TokenCard";
import { TTokenCardPropertiesClasses } from "./tokens/token-card/TokenCard";
import {
  tokenCardPrettifyLoadingProps as mainTokenCardPrettifyLoadingProps,
  tokenCardPropertiesClasses as mainTokenCardPropertiesClasses,
  tokenCardRenderProps as mainTokenCardRenderProps,
  tokensCardPrettifyLoadingProps as mainTokensCardPrettifyLoadingProps,
  tokensCardPropertiesClasses as mainTokensCardPropertiesClassess,
  tokensCardRenderProps as mainTokensCardRenderProps,
} from "./tokens/tokens-card/MainTokensCardConfig";
import {
  tokenCardPrettifyLoadingProps as mainNumberOverlayTokenCardPrettifyLoadingProps,
  tokenCardPropertiesClasses as mainNumberOverlayTokenCardPropertiesClasses,
  tokenCardRenderProps as mainNumberOverlayTokenCardRenderProps,
  tokensCardPrettifyLoadingProps as mainNumberOverlayTokensCardPrettifyLoadingProps,
  tokensCardPropertiesClasses as mainNumberOverlayTokensCardPropertiesClassess,
  tokensCardRenderProps as mainNumberOverlayTokensCardRenderProps,
} from "./tokens/tokens-card/MainTokensCardWithNumberOverlayConfig";
import {
  tokenCardPrettifyLoadingProps as navBarTokenCardPrettifyLoadingProps,
  tokenCardPropertiesClasses as navBarTokenCardPropertiesClasses,
  tokenCardRenderProps as navBarTokenCardRenderProps,
  tokensCardPrettifyLoadingProps as navBarTokensCardPrettifyLoadingProps,
  tokensCardPropertiesClasses as navBarTokensCardPropertiesClassess,
  tokensCardRenderProps as navBarTokensCardRenderProps,
} from "./tokens/tokens-card/NavBarCardConfig";
import { TokensCard } from "./tokens/tokens-card/TokensCard";
import { useAccount } from "wagmi";

function buildTokensCard(
  tokens: Token[],
  imageProperties?: ImageProperties,
  propertiesClasses?: TTokenCardPropertiesClasses,
  renderProps?: TBaseTokenCardBooleanSet,
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps,
) {
  const arr = [];
  for (let i = 0; i < tokens.length; i++) {
    const tokenCardProp: TTokenCardPropss = {
      token: tokens[i],
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
    navBarCardImageProperties,
    navBarTokenCardPropertiesClasses,
    navBarTokenCardRenderProps,
    navBarTokenCardPrettifyLoadingProps,
  );

  const mainTokenCard = buildTokensCard(
    tokensData.tokens,
    mainCardImageProperties,
    mainTokenCardPropertiesClasses,
    mainTokenCardRenderProps,
    mainTokenCardPrettifyLoadingProps,
  );

  const mainNumberOverlayTokenCard = buildTokensCard(
    tokensData.tokens,
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
