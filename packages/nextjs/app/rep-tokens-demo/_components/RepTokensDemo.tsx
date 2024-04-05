"use client";

import { useAccount } from "wagmi";
import { StylizedAddressCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedAddressCard";
import { StylizedBalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedBalanceCard";
import { StylizedImageCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedImageCard";
import { StylizedStringCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedStringCard";
import { StylizedTokenCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard";
import {
  ReputationComponent,
  StylizedTokenGroupCard,
} from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenGroupCard";
import { BalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/BalanceCard";
// import { StylizedTokenGroupCard2 } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenGroupCard2";
import { DescriptionCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/DescriptionCard";
import { ImageCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/ImageCard";
import { MaxMintAmountPerTxCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/MaxMintAmountPerTxCard";
import { NameCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/NameCard";
import { RedeemableCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/RedeemableCard";
import { SoulboundCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/SoulboundCard";
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import { useScaffoldContract, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function RepTokensDemo() {
  const { address } = useAccount();
  const { tokensData, refetchBalances: refetchUserBalances } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  const { writeAsync: claim } = useScaffoldContractWrite({
    contractName: "ReputationFaucet",
    functionName: "claim",
  });

  const { data: faucet } = useScaffoldContract({ contractName: "ReputationFaucet" });

  const { tokensData: faucetTokensData, refetchBalances: refetchFaucetBalances } = useRepTokens(faucet?.address);

  for (let i = 0; i < faucetTokensData.tokens.length; i++) {
    faucetTokensData.tokens[i].image = faucetTokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

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
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <StylizedTokenGroupCard
          tokens={faucetTokensData.tokens}
          components={widgetComponents}
          isBalanceOverlayed={true}
          size="xs"
        >
          <StylizedStringCard value={"Faucet"} />
        </StylizedTokenGroupCard>
        <button
          className="btn btn-primary btn-sm font-normal gap-1"
          onClick={async () => {
            await claim();
            await refetchUserBalances();
            await refetchFaucetBalances();
          }}
        >
          Claim Tokens
        </button>

        {/* <StylizedTokenGroupCard2 tokens={tokensData.tokens} components={mainComponents}>
          <StylizedAddressCard address={tokensData.address} isGroup={true} />
        </StylizedTokenGroupCard2> */}

        <p className="text-center text-4xl">Individual Components 1</p>
        <StylizedBalanceCard value={Number(tokensData.tokens[0]?.balance)} />
        <StylizedImageCard src={tokensData.tokens[0]?.image} />
        <StylizedStringCard value={tokensData.tokens[0]?.name} type="bold" />
        <StylizedStringCard value={tokensData.tokens[0]?.description} />
        <StylizedStringCard value={`Soulbound: ${tokensData.tokens[0]?.properties.isSoulbound.toString()}`} />
        <StylizedStringCard value={`Redeemable: \n ${tokensData.tokens[0]?.properties.isRedeemable.toString()}`} />
        <StylizedStringCard
          value={`Max Mint Amount Per Tx: \n${tokensData.tokens[0]?.properties.maxMintAmountPerTx.toString()}`}
        />

        <p className="text-center text-4xl">Individual Components 2</p>
        <BalanceCard token={tokensData.tokens[0]} />
        <ImageCard token={tokensData.tokens[0]} />
        <NameCard token={tokensData.tokens[0]} />
        <DescriptionCard token={tokensData.tokens[0]} />
        <StylizedAddressCard address={tokensData.tokens[0]?.address} />
        <SoulboundCard token={tokensData.tokens[0]} />
        <RedeemableCard token={tokensData.tokens[0]} />
        <MaxMintAmountPerTxCard token={tokensData.tokens[0]} />

        <p className="text-center text-4xl">Single Card</p>
        <StylizedTokenCard token={tokensData.tokens[0]}>
          {/* <StylizedBalanceCard value={Number(tokensData.tokens[0]?.balance)} />
          <StylizedImageCard src={tokensData.tokens[0]?.image} />

          <StylizedStringCard value={tokensData.tokens[0]?.name} type="bold" />
          <StylizedStringCard value={tokensData.tokens[0]?.description} />
          <StylizedAddressCard address={tokensData.tokens[0]?.address} />
          <StylizedStringCard value={`Soulbound: ${tokensData.tokens[0]?.properties.isSoulbound.toString()}`} />
          <StylizedStringCard value={`Redeemable: \n ${tokensData.tokens[0]?.properties.isRedeemable.toString()}`} />
          <StylizedStringCard
            value={`Max Mint Amount Per Tx \n${tokensData.tokens[0]?.properties.maxMintAmountPerTx.toString()}`}
          /> */}
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
