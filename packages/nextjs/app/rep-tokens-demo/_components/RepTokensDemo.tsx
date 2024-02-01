"use client";

import { useAccount } from "wagmi";
import { tokenGroupCardConfigProps } from "~~/components/rep-tokens-demo/MainTokensCardConfig";
import { TokenGroupCard } from "~~/components/rep-tokens/cards/token-group-card/TokenGroupCard";
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import { buildTokenCards, buildTokenGroupCard } from "~~/components/rep-tokens/utils/buildTokensCard";
import { Address } from "~~/components/scaffold-eth";

export function RepTokensDemo() {
  const { address } = useAccount();
  const { tokensData } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  const mainTokenCards = buildTokenCards(
    tokensData.tokens,
    tokensData.address,
    tokenGroupCardConfigProps.tokenCardProps,
  );
  const mainTokenGroupCardProps = buildTokenGroupCard(tokenGroupCardConfigProps, mainTokenCards, tokensData.address);

  if (tokenGroupCardConfigProps.address?.isRendering) {
    mainTokenGroupCardProps.addressOutput = <Address props={mainTokenGroupCardProps.addressProps} />;
  }

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
          <TokenGroupCard props={mainTokenGroupCardProps} />
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
}
