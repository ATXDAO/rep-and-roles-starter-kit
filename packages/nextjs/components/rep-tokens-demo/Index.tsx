import { ImageProperties } from "../rep-tokens/cards/property-cards/ImageCard";
import { TokenGroupCard } from "../rep-tokens/cards/token-group-card/TokenGroupCard";
import { useRepTokens } from "../rep-tokens/hooks/Hooks";
import { buildTokenGroupCard } from "../rep-tokens/utils/buildTokensCard";
import {
  tokenCardPrettifyLoadingProps as isBeautifyingMainTokenCardLoadingProps,
  tokensCardPrettifyLoadingProps as isBeautifyingMainTokenGroupCardLoadingProps,
  isRenderingTokenCardProps as isRenderingMainTokenCardProps,
  tokensCardRenderProps as isRenderingMainTokenGroupCardProps,
  tokenCardPropertiesClasses as mainTokenCardPropertiesClasses,
  tokensCardPropertiesClasses as mainTokenGroupCardElementsClassess,
} from "./MainTokensCardConfig";
import {
  tokenCardPrettifyLoadingProps as isBeautifyingMainTokenCardOverlayLoadingProps,
  isRenderingTokenCardProps as isRenderingMainTokenCardOverlayProps,
  tokenCardPropertiesClasses as mainNumberOverlayTokenCardPropertiesClasses,
  tokensCardPropertiesClasses as mainNumberOverlayTokensCardElementsClasses,
  tokensCardPrettifyLoadingProps as mainNumberOverlayTokensCardPrettifyLoadingProps,
  tokensCardRenderProps as mainNumberOverlayTokensCardRenderProps,
} from "./MainTokensCardWithNumberOverlayConfig";
import {
  tokenCardPrettifyLoadingProps as isBeautifyingNavBarLoadingProps,
  tokensCardPrettifyLoadingProps as isBeuatyingNavBarTokenGroupCardLoadingProps,
  isRenderingTokenCardProps as isRenderingNavBarCardProps,
  tokensCardRenderProps as isRenderingNavBarTokenGroupCardProps,
  tokenCardPropertiesClasses as navBarElementsClasses,
  tokensCardPropertiesClasses as navBarTokenGroupCardElementsClasses,
} from "./NavBarCardConfig";
import { useAccount } from "wagmi";

export const Index = () => {
  const navBarCardImageProperties = new ImageProperties("Token", 64, 64);
  const mainCardImageProperties = new ImageProperties("Token", 256, 256);

  const { address } = useAccount();

  const { tokensData } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  const navBarTokenCard = buildTokenGroupCard(
    tokensData.tokens,
    tokensData.address,
    navBarCardImageProperties,
    navBarElementsClasses,
    isRenderingNavBarCardProps,
    isBeautifyingNavBarLoadingProps,
  );

  const mainTokenGroupCard = buildTokenGroupCard(
    tokensData.tokens,
    tokensData.address,
    mainCardImageProperties,
    mainTokenCardPropertiesClasses,
    isRenderingMainTokenCardProps,
    isBeautifyingMainTokenCardLoadingProps,
  );

  const mainNumberOverlayTokenCard = buildTokenGroupCard(
    tokensData.tokens,
    tokensData.address,
    mainCardImageProperties,
    mainNumberOverlayTokenCardPropertiesClasses,
    isRenderingMainTokenCardOverlayProps,
    isBeautifyingMainTokenCardOverlayLoadingProps,
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard
            address={tokensData.address}
            tokenCardsProps={navBarTokenCard}
            elementsClasses={navBarTokenGroupCardElementsClasses}
            isRenderingTokenGroupCardProps={isRenderingNavBarTokenGroupCardProps}
            isBeautifyingTokenGroupCardLoadingProps={isBeuatyingNavBarTokenGroupCardLoadingProps}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard
            address={tokensData.address}
            tokenCardsProps={mainTokenGroupCard}
            elementsClasses={mainTokenGroupCardElementsClassess}
            isRenderingTokenGroupCardProps={isRenderingMainTokenGroupCardProps}
            isBeautifyingTokenGroupCardLoadingProps={isBeautifyingMainTokenGroupCardLoadingProps}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard
            address={tokensData.address}
            tokenCardsProps={mainNumberOverlayTokenCard}
            elementsClasses={mainNumberOverlayTokensCardElementsClasses}
            isRenderingTokenGroupCardProps={mainNumberOverlayTokensCardRenderProps}
            isBeautifyingTokenGroupCardLoadingProps={mainNumberOverlayTokensCardPrettifyLoadingProps}
          />
        </div>
      </div>
    </>
  );
};
