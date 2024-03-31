"use client";

// import { tokenCardConfigProps as singleCardConfig } from "./configs/SingleCardConfig";
// import { balanceConfigProps } from "./configs/values/BalanceCardConfig";
// import { descriptionConfigProps } from "./configs/values/DescriptionCardConfig";
// import { imageConfigProps } from "./configs/values/ImageCardConfig";
// import { isRedeemableConfigProps } from "./configs/values/IsRedeemableCardConfig";
// import { isSoulboundConfigProps } from "./configs/values/IsSoulboundCardConfig";
// import { maxMintAmountConfigProps } from "./configs/values/MaxMintAmountCardConfig";
// import { nameConfigProps } from "./configs/values/NameCardConfig";
import { useAccount } from "wagmi";
// import { tokenGroupCardConfigProps as mainTokenGroupCardConfigProps } from "~~/app/rep-tokens-demo/_components/configs/MainTokensCardConfig";
// import { tokenGroupCardConfigProps as mainTokenGroupOverlayCardConfigProps } from "~~/app/rep-tokens-demo/_components/configs/MainTokensCardWithNumberOverlayConfig";
// import { tokenGroupCardConfigProps as navBarTokenGroupConfigProps } from "~~/app/rep-tokens-demo/_components/configs/NavBarCardConfig";
// import { BalanceImageOverlay } from "~~/components/rep-tokens/cards/stylized-cards/BalanceImageOverlay";
import { StylizedAddressCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedAddressCard";
import { StylizedBalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedBalanceCard";
import { StylizedImageCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedImageCard";
import { StylizedStringCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedStringCard";
import { StylizedTokenCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard";
import {
  ReputationComponent,
  StylizedTokenGroupCard,
} from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenGroupCard";
// import { TokenCard } from "~~/components/rep-tokens/cards/token-card/TokenCard";
// import { TokenGroupCard } from "~~/components/rep-tokens/cards/token-group-card/TokenGroupCard";
// import { BalanceCard } from "~~/components/rep-tokens/cards/value-cards/BalanceCard";
// import { ImageCard } from "~~/components/rep-tokens/cards/value-cards/ImageCard";
// import { StringCard } from "~~/components/rep-tokens/cards/value-cards/StringCard";
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
// import {
//   buildBalanceCard,
//   buildImageCard,
//   buildStringCard,
//   buildTokenCard,
//   buildTokenCards,
//   buildTokenGroupCard,
// } from "~~/components/rep-tokens/utils/buildTokensCard";
// import { Address } from "~~/components/scaffold-eth";
import {
  useScaffoldContract,
  /*useScaffoldContractRead,*/
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";

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

  // //////
  // ////// Card Creation
  // /////

  // // Multi-card
  // const mainTokenCards = buildTokenCards(
  //   tokensData.tokens,
  //   tokensData.address,
  //   mainTokenGroupCardConfigProps.tokenCardConfigProps,
  // );
  // const mainTokenGroupCardProps = buildTokenGroupCard(
  //   mainTokenGroupCardConfigProps,
  //   mainTokenCards,
  //   tokensData.address,
  // );

  // if (mainTokenGroupCardConfigProps.address?.isRendering) {
  //   mainTokenGroupCardProps.addressOutput = <Address address={tokensData.address} />;
  // }

  // // Multi-card with overlay
  // const mainTokensOverlayCards = buildTokenCards(
  //   tokensData.tokens,
  //   tokensData.address,
  //   mainTokenGroupOverlayCardConfigProps.tokenCardConfigProps,
  // );

  // const mainTokenGroupOverlayCardProps = buildTokenGroupCard(
  //   mainTokenGroupOverlayCardConfigProps,
  //   mainTokensOverlayCards,
  //   tokensData.address,
  // );

  // if (mainTokenGroupOverlayCardConfigProps.address?.isRendering) {
  //   mainTokenGroupOverlayCardProps.addressOutput = <Address address={tokensData.address} />;
  // }

  // // Widget
  // const navBarTokenCards = buildTokenCards(
  //   tokensData.tokens,
  //   tokensData.address,
  //   navBarTokenGroupConfigProps.tokenCardConfigProps,
  // );
  // const navBarTokenGroupCardProps = buildTokenGroupCard(
  //   navBarTokenGroupConfigProps,
  //   navBarTokenCards,
  //   tokensData.address,
  // );

  // if (navBarTokenGroupConfigProps.address?.isRendering) {
  //   navBarTokenGroupCardProps.addressOutput = <Address address={tokensData.address} />;
  // }

  // // Single Card
  // const singleCard = buildTokenCard(tokensData?.tokens[0], tokensData.address, singleCardConfig);

  // // Individual Components
  // const balanceProps = buildBalanceCard(tokensData?.tokens[0]?.balance, balanceConfigProps);
  // const nameProps = buildStringCard(tokensData?.tokens[0]?.name, nameConfigProps);
  // const descriptionsProps = buildStringCard(tokensData?.tokens[0]?.description, descriptionConfigProps);
  // const imageProps = buildImageCard(tokensData?.tokens[0]?.image, imageConfigProps);
  // // const addressProps = buildStringCard(tokensData?.address, addressConfigProps);

  // const isSoulboundProps = buildStringCard(
  //   tokensData?.tokens[0]?.properties?.isSoulbound !== undefined
  //     ? `Is Soulbound: ${tokensData?.tokens[0]?.properties.isSoulbound}`
  //     : undefined,
  //   isSoulboundConfigProps,
  // );

  // const isRedeemableProps = buildStringCard(
  //   tokensData?.tokens[0]?.properties?.isRedeemable !== undefined
  //     ? `Is Redeemable: ${tokensData?.tokens[0]?.properties.isRedeemable}`
  //     : undefined,
  //   isRedeemableConfigProps,
  // );

  // const maxMintAmountProps = buildStringCard(
  //   tokensData?.tokens[0]?.properties?.maxMintAmountPerTx !== undefined
  //     ? `Max Mint Amount Per Tx: ${tokensData?.tokens[0]?.properties.maxMintAmountPerTx}`
  //     : undefined,
  //   maxMintAmountConfigProps,
  // );

  const { writeAsync: claim } = useScaffoldContractWrite({
    contractName: "ReputationFaucet",
    functionName: "claim",
  });

  const { data: faucet } = useScaffoldContract({ contractName: "ReputationFaucet" });

  const { tokensData: faucetTokensData } = useRepTokens(faucet?.address);

  for (let i = 0; i < faucetTokensData.tokens.length; i++) {
    faucetTokensData.tokens[i].image = faucetTokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  // const { data: balanceOf0 } = useScaffoldContractRead({
  //   contractName: "ReputationTokensStandalone",
  //   functionName: "balanceOf",
  //   args: [faucet?.address, BigInt(0)],
  // });

  // const { data: balanceOf1 } = useScaffoldContractRead({
  //   contractName: "ReputationTokensStandalone",
  //   functionName: "balanceOf",
  //   args: [faucet?.address, BigInt(1)],
  // });

  // const { data: balanceOf2 } = useScaffoldContractRead({
  //   contractName: "ReputationTokensStandalone",
  //   functionName: "balanceOf",
  //   args: [faucet?.address, BigInt(2)],
  // });

  // const output = (
  //   <>
  //     {props?.valuesProps?.balanceProps ? <BalanceCard props={props?.valuesProps?.balanceProps} /> : <></>}
  //     {props?.valuesProps?.imageProps ? <ImageCard props={props?.valuesProps?.imageProps} /> : <></>}
  //     {props?.valuesProps?.nameProps ? <StringCard props={props?.valuesProps?.nameProps} /> : <></>}
  //     {props?.valuesProps?.descriptionProps ? <StringCard props={props?.valuesProps?.descriptionProps} /> : <></>}
  //     {props?.valuesProps?.addressProps ? <Address props={props?.valuesProps?.addressProps} /> : <></>}
  //     {props?.valuesProps?.isRedeemableProps ? <StringCard props={props?.valuesProps?.isRedeemableProps} /> : <></>}
  //     {props?.valuesProps?.isSoulboundProps ? <StringCard props={props?.valuesProps?.isSoulboundProps} /> : <></>}
  //     {props?.valuesProps?.maxMintAmountProps ? <StringCard props={props?.valuesProps?.maxMintAmountProps} /> : <></>}
  //   </>
  // );

  const mainComponents: ReputationComponent[] = [
    "Balance",
    "Image",
    "Name",
    "Description",
    "Address",
    "IsSoulbound",
    "IsRedeemable",
    "MaxMintAmountPerTx",
  ];

  const widgetComponents: ReputationComponent[] = ["Balance", "Image"];

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <p>Faucet</p>
        <StylizedTokenGroupCard
          tokens={faucetTokensData.tokens}
          components={widgetComponents}
          isBalanceOverlayed={true}
          size="xs"
        />
        <button
          className="btn btn-secondary btn-sm font-normal gap-1"
          onClick={async () => {
            await claim();
          }}
        >
          Claim Tokens
        </button>

        <p className="text-center text-4xl">Individual Components</p>
        <StylizedBalanceCard value={Number(tokensData.tokens[0]?.balance)} />
        <StylizedImageCard src={tokensData.tokens[0]?.image} />

        <StylizedStringCard value={tokensData.tokens[0]?.name} color="violet" type="bold" />
        <StylizedStringCard value={tokensData.tokens[0]?.description} color="lime" />
        <StylizedAddressCard address={tokensData.tokens[0]?.address} color="pink" />
        <StylizedStringCard value={`Soulbound: ${tokensData.tokens[0]?.properties.isSoulbound.toString()}`} />
        <StylizedStringCard
          value={`Redeemable: \n ${tokensData.tokens[0]?.properties.isRedeemable.toString()}`}
          color="yellow"
        />
        <StylizedStringCard
          value={`Max Mint Amount Per Tx \n${tokensData.tokens[0]?.properties.maxMintAmountPerTx.toString()}`}
          color="teal"
        />
        <p className="text-center text-4xl">Single Card</p>

        <StylizedTokenCard>
          <StylizedBalanceCard value={Number(tokensData.tokens[0]?.balance)} />
          <StylizedImageCard src={tokensData.tokens[0]?.image} />

          <StylizedStringCard value={tokensData.tokens[0]?.name} color="violet" type="bold" />
          <StylizedStringCard value={tokensData.tokens[0]?.description} color="lime" />
          <StylizedAddressCard address={tokensData.tokens[0]?.address} color="pink" />
          <StylizedStringCard
            value={`Soulbound: ${tokensData.tokens[0]?.properties.isSoulbound.toString()}`}
            color="blue"
          />
          <StylizedStringCard
            value={`Redeemable: \n ${tokensData.tokens[0]?.properties.isRedeemable.toString()}`}
            color="yellow"
          />
          <StylizedStringCard
            value={`Max Mint Amount Per Tx \n${tokensData.tokens[0]?.properties.maxMintAmountPerTx.toString()}`}
            color="teal"
          />
        </StylizedTokenCard>

        <p className="text-center text-4xl">Multi-Card</p>

        <StylizedTokenGroupCard tokens={tokensData.tokens} components={mainComponents}>
          <StylizedAddressCard address={tokensData.address} isGroup={true} />
        </StylizedTokenGroupCard>

        <p className="text-center text-4xl">Multi-Card W/ Overlay</p>

        <StylizedTokenGroupCard tokens={tokensData.tokens} components={mainComponents} isBalanceOverlayed={true}>
          <StylizedAddressCard address={tokensData.address} isGroup={true} />
        </StylizedTokenGroupCard>

        <p className="text-center text-4xl">Small</p>

        <StylizedTokenGroupCard
          tokens={tokensData.tokens}
          components={widgetComponents}
          isBalanceOverlayed={true}
          size="sm"
        />

        <p className="text-center text-4xl">Widget</p>

        <StylizedTokenGroupCard
          tokens={tokensData.tokens}
          components={widgetComponents}
          isBalanceOverlayed={true}
          size="xs"
        />
      </div>
    </>
  );
}
