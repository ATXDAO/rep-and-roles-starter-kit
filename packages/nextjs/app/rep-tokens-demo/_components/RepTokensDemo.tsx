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
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

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

  //  26959946667150639794667015087019630673637144422540572481103610249216
  // 26960358043289970096177553829315270011263390106506980876069447401472

  // console.log(loadBurnerSK());

  // const { data: isAdminOfHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "isAdminOfHat",
  //   args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  // });

  // const { data: balanceOfHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "balanceOf",
  //   args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  // });

  // const { data: viewHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "viewHat",
  //   args: [BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  // });

  const { data: isEligible } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "isEligible",
    args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  });

  const { data: isActive } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "isActive",
    args: [BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  });

  console.log(isEligible);
  console.log(isActive);

  // const { writeAsync: mintHat } = useScaffoldContractWrite({
  //   contractName: "Hats",
  //   functionName: "mintHat",
  //   args: [BigInt("26959946667150639794667015087019630673637144422540572481103610249216"), address],
  // });

  // console.log(isEligible);

  // console.log(viewHat);

  const { data: balanceOfClaimableHat, refetch } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "balanceOf",
    args: [address, BigInt("26960358049567071831564234593151059434471056522609336320533481914368")],
  });

  console.log(balanceOfClaimableHat);

  const { writeAsync: claimHat } = useScaffoldContractWrite({
    contractName: "SimpleClaimHatter",
    functionName: "claimHat",
    args: [BigInt("26960358049567071831564234593151059434471056522609336320533481914368")],
  });

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <button
          onClick={async () => {
            await claimHat();
            await refetch();
          }}
        >
          Claim Hat
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
