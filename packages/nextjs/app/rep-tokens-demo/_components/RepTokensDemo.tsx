"use client";

import { tokenCardConfigProps as singleCardConfig } from "./SingleCardConfig";
import { useAccount } from "wagmi";
import { tokenGroupCardConfigProps as mainTokenGroupCardConfigProps } from "~~/app/rep-tokens-demo/_components/MainTokensCardConfig";
import { tokenGroupCardConfigProps as mainTokenGroupOverlayCardConfigProps } from "~~/app/rep-tokens-demo/_components/MainTokensCardWithNumberOverlayConfig";
import { tokenGroupCardConfigProps as navBarTokenGroupConfigProps } from "~~/app/rep-tokens-demo/_components/NavBarCardConfig";
import { TokenCard } from "~~/components/rep-tokens/cards/token-card/TokenCard";
import { TokenGroupCard } from "~~/components/rep-tokens/cards/token-group-card/TokenGroupCard";
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import { buildTokenCard, buildTokenCards, buildTokenGroupCard } from "~~/components/rep-tokens/utils/buildTokensCard";
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
    mainTokenGroupCardConfigProps.tokenCardConfigProps,
  );
  const mainTokenGroupCardProps = buildTokenGroupCard(
    mainTokenGroupCardConfigProps,
    mainTokenCards,
    tokensData.address,
  );

  if (mainTokenGroupCardConfigProps.address?.isRendering) {
    mainTokenGroupCardProps.addressOutput = <Address props={mainTokenGroupCardProps.addressProps} />;
  }

  const mainTokensOverlayCards = buildTokenCards(
    tokensData.tokens,
    tokensData.address,
    mainTokenGroupOverlayCardConfigProps.tokenCardConfigProps,
  );
  const mainTokenGroupOverlayCardProps = buildTokenGroupCard(
    mainTokenGroupOverlayCardConfigProps,
    mainTokensOverlayCards,
    tokensData.address,
  );

  if (mainTokenGroupOverlayCardConfigProps.address?.isRendering) {
    mainTokenGroupOverlayCardProps.addressOutput = <Address props={mainTokenGroupOverlayCardProps.addressProps} />;
  }

  const navBarTokenCards = buildTokenCards(
    tokensData.tokens,
    tokensData.address,
    navBarTokenGroupConfigProps.tokenCardConfigProps,
  );
  const navBarTokenGroupCardProps = buildTokenGroupCard(
    navBarTokenGroupConfigProps,
    navBarTokenCards,
    tokensData.address,
  );

  if (navBarTokenGroupConfigProps.address?.isRendering) {
    navBarTokenGroupCardProps.addressOutput = <Address props={navBarTokenGroupCardProps.addressProps} />;
  }

  const singleCard0 = buildTokenCard(tokensData?.tokens[0], tokensData.address, singleCardConfig);

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div></div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenCard props={singleCard0} />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard props={mainTokenGroupCardProps} />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard props={mainTokenGroupOverlayCardProps} />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard props={navBarTokenGroupCardProps} />
        </div>
      </div>
    </>
  );
}
