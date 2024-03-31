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
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import { useScaffoldContract, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function RepTokensDemo() {
  const { address } = useAccount();
  const { tokensData } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  const { writeAsync: claim } = useScaffoldContractWrite({
    contractName: "ReputationFaucet",
    functionName: "claim",
  });

  const { data: faucet } = useScaffoldContract({ contractName: "ReputationFaucet" });

  const { tokensData: faucetTokensData } = useRepTokens(faucet?.address);

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
