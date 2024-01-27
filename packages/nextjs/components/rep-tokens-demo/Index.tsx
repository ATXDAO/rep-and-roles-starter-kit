// import { ImageProperties } from "../rep-tokens/cards/property-cards/ImageCard";
import { TokenGroupCard } from "../rep-tokens/cards/token-group-card/TokenGroupCard";
import { useRepTokens } from "../rep-tokens/hooks/Hooks";
import {
  buildTokenCards, //  RenderProps, TokenElementsClasses
} from "../rep-tokens/utils/buildTokensCard";
import {
  // tokensCardPropertiesClasses as mainTokenGroupCardElementsClassess,
  tokenCardProps,
  tokenGroupCardProps,
} from "./MainTokensCardConfig";
// import {
//   tokenCardPrettifyLoadingProps as isBeautifyingMainTokenCardOverlayLoadingProps,
//   tokenCardPropertiesClasses as mainNumberOverlayTokenCardPropertiesClasses,
//   tokensCardPropertiesClasses as mainNumberOverlayTokensCardElementsClasses,
//   tokensCardPrettifyLoadingProps as mainNumberOverlayTokensCardPrettifyLoadingProps,
// } from "./MainTokensCardWithNumberOverlayConfig";
// import {
//   tokenCardPrettifyLoadingProps as isBeautifyingNavBarLoadingProps,
//   tokensCardPrettifyLoadingProps as isBeuatyingNavBarTokenGroupCardLoadingProps,
//   tokenCardPropertiesClasses as navBarElementsClasses,
//   tokensCardPropertiesClasses as navBarTokenGroupCardElementsClasses,
// } from "./NavBarCardConfig";
import { useAccount } from "wagmi";

export const Index = () => {
  // const navBarCardImageProperties = new ImageProperties("Token", 64, 64);
  // const mainCardImageProperties = new ImageProperties("Token", 256, 256);

  const { address } = useAccount();

  const { tokensData } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  // const navBarTokenCard = buildTokenGroupCard(
  //   tokensData.tokens,
  //   navBarCardImageProperties,
  //   navBarElementsClasses,
  //   isBeautifyingNavBarLoadingProps,
  //   false,
  //   false,
  //   undefined,

  // );

  // console.log(tokenCardElementsProps);

  const mainTokenCards = buildTokenCards(tokensData.tokens, tokensData.address, tokenCardProps);

  // const mainNumberOverlayTokenCard = buildTokenGroupCard(
  //   tokensData.tokens,
  //   true,
  //   true,
  //   tokensData.address,
  //   mainCardImageProperties,
  //   mainNumberOverlayTokenCardPropertiesClasses,
  //   isBeautifyingMainTokenCardOverlayLoadingProps,
  // );

  return (
    <>
      {/* <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard
            address={tokensData.address}
            tokenCardsProps={navBarTokenCard}
            elementsClasses={navBarTokenGroupCardElementsClasses}
            isBeautifyingTokenGroupCardLoadingProps={isBeuatyingNavBarTokenGroupCardLoadingProps}
          />
        </div>
      </div> */}

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard
            address={tokensData.address}
            tokenCardsProps={mainTokenCards}
            elementsClasses={tokenGroupCardProps.classes}
            isBeautifyingTokenGroupCardLoadingProps={tokenGroupCardProps.isPrettyLoading}
          />
        </div>
      </div>

      {/* <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard
            address={tokensData.address}
            tokenCardsProps={mainNumberOverlayTokenCard}
            elementsClasses={mainNumberOverlayTokensCardElementsClasses}
            isBeautifyingTokenGroupCardLoadingProps={mainNumberOverlayTokensCardPrettifyLoadingProps}
          />
        </div>
      </div> */}
    </>
  );
};
