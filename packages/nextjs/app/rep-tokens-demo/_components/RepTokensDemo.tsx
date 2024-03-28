"use client";

import { tokenCardConfigProps as singleCardConfig } from "./configs/SingleCardConfig";
import { addressConfigProps } from "./configs/values/AddressCardConfig";
import { balanceConfigProps } from "./configs/values/BalanceCardConfig";
import { descriptionConfigProps } from "./configs/values/DescriptionCardConfig";
import { imageConfigProps } from "./configs/values/ImageCardConfig";
import { isRedeemableConfigProps } from "./configs/values/IsRedeemableCardConfig";
import { isSoulboundConfigProps } from "./configs/values/IsSoulboundCardConfig";
import { maxMintAmountConfigProps } from "./configs/values/MaxMintAmountCardConfig";
import { nameConfigProps } from "./configs/values/NameCardConfig";
import { useAccount } from "wagmi";
import { tokenGroupCardConfigProps as mainTokenGroupCardConfigProps } from "~~/app/rep-tokens-demo/_components/configs/MainTokensCardConfig";
import { tokenGroupCardConfigProps as mainTokenGroupOverlayCardConfigProps } from "~~/app/rep-tokens-demo/_components/configs/MainTokensCardWithNumberOverlayConfig";
import { tokenGroupCardConfigProps as navBarTokenGroupConfigProps } from "~~/app/rep-tokens-demo/_components/configs/NavBarCardConfig";
import { TokenCard } from "~~/components/rep-tokens/cards/token-card/TokenCard";
import { TokenGroupCard } from "~~/components/rep-tokens/cards/token-group-card/TokenGroupCard";
import { BalanceCard } from "~~/components/rep-tokens/cards/value-cards/BalanceCard";
import { ImageCard } from "~~/components/rep-tokens/cards/value-cards/ImageCard";
import { StringCard } from "~~/components/rep-tokens/cards/value-cards/StringCard";
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import {
  buildBalanceCard,
  buildImageCard,
  buildStringCard,
  buildTokenCard,
  buildTokenCards,
  buildTokenGroupCard,
} from "~~/components/rep-tokens/utils/buildTokensCard";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

// import { loadBurnerSK } from "~~/hooks/scaffold-eth";

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

  // Single Card
  const singleCard = buildTokenCard(tokensData?.tokens[0], tokensData.address, singleCardConfig);

  // Individual Components
  const balanceProps = buildBalanceCard(tokensData?.tokens[0]?.balance, balanceConfigProps);
  const nameProps = buildStringCard(tokensData?.tokens[0]?.name, nameConfigProps);
  const descriptionsProps = buildStringCard(tokensData?.tokens[0]?.description, descriptionConfigProps);
  const imageProps = buildImageCard(tokensData?.tokens[0]?.image, imageConfigProps);
  const addressProps = buildStringCard(tokensData?.address, addressConfigProps);

  const isSoulboundProps = buildStringCard(
    tokensData?.tokens[0]?.properties?.isSoulbound !== undefined
      ? `Is Soulbound: ${tokensData?.tokens[0]?.properties.isSoulbound}`
      : undefined,
    isSoulboundConfigProps,
  );

  const isRedeemableProps = buildStringCard(
    tokensData?.tokens[0]?.properties?.isRedeemable !== undefined
      ? `Is Redeemable: ${tokensData?.tokens[0]?.properties.isRedeemable}`
      : undefined,
    isRedeemableConfigProps,
  );

  const maxMintAmountProps = buildStringCard(
    tokensData?.tokens[0]?.properties?.maxMintAmountPerTx !== undefined
      ? `Max Mint Amount Per Tx: ${tokensData?.tokens[0]?.properties.maxMintAmountPerTx}`
      : undefined,
    maxMintAmountConfigProps,
  );

  const { writeAsync: claim } = useScaffoldContractWrite({
    contractName: "ReputationFaucet",
    functionName: "claim",
  });

  const { data: faucet } = useScaffoldContract({ contractName: "ReputationFaucet" });

  const { data: balanceOf0 } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "balanceOf",
    args: [faucet?.address, BigInt(0)],
  });

  const { data: balanceOf1 } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "balanceOf",
    args: [faucet?.address, BigInt(1)],
  });

  const { data: balanceOf2 } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "balanceOf",
    args: [faucet?.address, BigInt(2)],
  });

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <p>Faucet Balance:</p>
        <p>
          0: {balanceOf0?.toString()}, 1: {balanceOf1?.toString()}, 2: {balanceOf2?.toString()}
        </p>
        <button
          className="btn btn-secondary btn-sm font-normal gap-1"
          onClick={async () => {
            await claim();
          }}
        >
          Claim Tokens
        </button>

        <p className="text-center text-4xl">Widget</p>
        <TokenGroupCard props={navBarTokenGroupCardProps} />

        <p className="text-center text-4xl">Multi-Card</p>
        <TokenGroupCard props={mainTokenGroupCardProps} />

        <p className="text-center text-4xl">Multi-Card W/ Overlay</p>
        <TokenGroupCard props={mainTokenGroupOverlayCardProps} />

        <p className="text-center text-4xl">Single Card</p>
        <TokenCard props={singleCard} />

        <p className="text-center text-4xl">Individual Components</p>
        <div className="flex flex-wrap justify-center items-center space-x-3 space-y-3">
          <BalanceCard props={balanceProps} />
          <ImageCard props={imageProps} />
          <StringCard props={nameProps} />
          <StringCard props={descriptionsProps} />
          <Address props={addressProps} />
          <StringCard props={isSoulboundProps} />
          <StringCard props={isRedeemableProps} />
          <StringCard props={maxMintAmountProps} />
        </div>
      </div>
    </>
  );
}
