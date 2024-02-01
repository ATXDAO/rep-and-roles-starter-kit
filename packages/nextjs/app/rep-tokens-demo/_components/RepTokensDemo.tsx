"use client";

import { tokenCardConfigProps as singleCardConfig } from "./configs/SingleCardConfig";
import { addressConfigProps } from "./configs/values/AddressCardConfig";
import { balanceConfigProps } from "./configs/values/BalanceCardConfig";
import { descriptionConfigProps } from "./configs/values/DescriptionCardConfig";
import { imageConfigProps } from "./configs/values/ImageCardConfig";
import { isTradeableConfigProps } from "./configs/values/IsTradeableCardConfig";
import { maxMintAmountConfigProps } from "./configs/values/MaxMintAmountCardConfig";
import { nameConfigProps } from "./configs/values/NameCardConfig";
import { useAccount } from "wagmi";
import { tokenGroupCardConfigProps as mainTokenGroupCardConfigProps } from "~~/app/rep-tokens-demo/_components/configs/MainTokensCardConfig";
import { tokenGroupCardConfigProps as mainTokenGroupOverlayCardConfigProps } from "~~/app/rep-tokens-demo/_components/configs/MainTokensCardWithNumberOverlayConfig";
import { tokenGroupCardConfigProps as navBarTokenGroupConfigProps } from "~~/app/rep-tokens-demo/_components/configs/NavBarCardConfig";
// Single Card
import { TokenCard } from "~~/components/rep-tokens/cards/token-card/TokenCard";
// Multi-Card
import { TokenGroupCard } from "~~/components/rep-tokens/cards/token-group-card/TokenGroupCard";
import { BalanceCard } from "~~/components/rep-tokens/cards/value-cards/BalanceCard";
import { ImageCard } from "~~/components/rep-tokens/cards/value-cards/ImageCard";
import { StringCard } from "~~/components/rep-tokens/cards/value-cards/StringCard";
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
// Utils
import {
  buildBalanceCard,
  buildImageCard,
  buildStringCard,
  buildTokenCard,
  buildTokenCards,
  buildTokenGroupCard,
} from "~~/components/rep-tokens/utils/buildTokensCard";
// Individual Components
import { Address } from "~~/components/scaffold-eth";

export function RepTokensDemo() {
  //////
  ////// Data Gathering
  /////

  const { address } = useAccount();
  const { tokensData } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  //////
  ////// Card Creation
  /////

  // Individual Components
  const balanceProps = buildBalanceCard(tokensData?.tokens[0]?.balance, balanceConfigProps);
  const nameProps = buildStringCard(tokensData?.tokens[0]?.name, nameConfigProps);
  const descriptionsProps = buildStringCard(tokensData?.tokens[0]?.description, descriptionConfigProps);
  const imageProps = buildImageCard(tokensData?.tokens[0]?.image, imageConfigProps);
  const addressProps = buildStringCard(tokensData?.address, addressConfigProps);

  const isTradeableProps = buildStringCard(
    tokensData?.tokens[0]?.properties?.isTradeable !== undefined
      ? `Is Tradeable: ${tokensData?.tokens[0]?.properties.isTradeable}`
      : undefined,
    isTradeableConfigProps,
  );
  const maxMintAmountProps = buildStringCard(
    tokensData?.tokens[0]?.properties?.maxMintAmountPerTx !== undefined
      ? `Max Mint Amount Per Tx: ${tokensData?.tokens[0]?.properties.maxMintAmountPerTx}`
      : undefined,
    maxMintAmountConfigProps,
  );

  // Single Card
  const singleCard = buildTokenCard(tokensData?.tokens[0], tokensData.address, singleCardConfig);

  // Multi-card
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

  // Multi-card with overlay
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

  // Widget
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

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <p className="text-center text-4xl">Individual Components</p>
        <BalanceCard props={balanceProps} />
        <ImageCard props={imageProps} />
        <StringCard props={nameProps} />
        <StringCard props={descriptionsProps} />
        <Address props={addressProps} />
        <StringCard props={isTradeableProps} />
        <StringCard props={maxMintAmountProps} />

        <p className="text-center text-4xl">Single Card</p>
        <TokenCard props={singleCard} />

        <p className="text-center text-4xl">Multi-Card</p>
        <TokenGroupCard props={mainTokenGroupCardProps} />

        <p className="text-center text-4xl">Multi-Card W/ Overlay</p>
        <TokenGroupCard props={mainTokenGroupOverlayCardProps} />

        <p className="text-center text-4xl">Widget</p>
        <TokenGroupCard props={navBarTokenGroupCardProps} />
      </div>
    </>
  );
}
