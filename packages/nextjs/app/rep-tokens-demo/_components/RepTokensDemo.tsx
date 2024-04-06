"use client";

import { useAccount } from "wagmi";
import { StylizedAddressCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedAddressCard";
import { StylizedBalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedBalanceCard";
import { StylizedImageCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedImageCard";
import { StylizedStringCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedStringCard";
import { StylizedTokenCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard";
import { StylizedTokenCard2 } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard2";
import { StylizedTokenCard3 } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard3";
import {
  ReputationComponent,
  StylizedTokenGroupCard,
} from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenGroupCard";
import { AddressCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/AddressCard";
import { BalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/BalanceCard";
// import { StylizedTokenGroupCard2 } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenGroupCard2";
import { DescriptionCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/DescriptionCard";
import { ImageCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/ImageCard";
import { MaxMintAmountPerTxCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/MaxMintAmountPerTxCard";
import { NameCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/NameCard";
// import { RedeemableCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/RedeemableCard";
// import { SoulboundCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/SoulboundCard";
import { TokenTypeCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/TokenTypeCard";
import { useGetRepToken, useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import { useScaffoldContract, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function RepTokensDemo() {
  console.log("Hello");
  const { address } = useAccount();

  const { token, refetchBalance } = useGetRepToken(address, BigInt(0));

  token.image = token?.image?.replace("ipfs://", "https://ipfs.io/ipfs/");

  const { tokensData: tokens, refetchBalances: refetchUserBalances } = useRepTokens(address);

  for (let i = 0; i < tokens.tokens.length; i++) {
    tokens.tokens[i].image = tokens.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  const { writeAsync: claim } = useScaffoldContractWrite({
    contractName: "ReputationFaucet",
    functionName: "claim",
  });

  const { data: faucet } = useScaffoldContract({ contractName: "ReputationFaucet" });

  const { tokensData: faucetTokens, refetchBalances: refetchFaucetBalances } = useRepTokens(faucet?.address);

  for (let i = 0; i < faucetTokens.tokens.length; i++) {
    faucetTokens.tokens[i].image = faucetTokens.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  // const mainComponents: ReputationComponent[] = [
  //   "Balance",
  //   "Image",
  //   "Name",
  //   "Description",
  //   "Address",
  //   "IsSoulbound",
  //   "IsRedeemable",
  //   "MaxMintAmountPerTx",
  // ];

  const widgetComponents: ReputationComponent[] = ["Balance", "Image"];

  console.log(token);

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <StylizedTokenGroupCard
          tokens={faucetTokens}
          components={widgetComponents}
          isBalanceOverlayed={true}
          size="xs"
          preChildren={<p className="text-center text-4xl bg-base-200 rounded-lg">Faucet</p>}
          postChildren={
            <button
              className="btn btn-primary btn-sm font-normal gap-1"
              onClick={async () => {
                await claim();
                await refetchUserBalances();
                await refetchFaucetBalances();
                await refetchBalance();
              }}
            >
              Claim Tokens
            </button>
          }
        />

        <div className="flex">
          <div>
            <p className="text-center text-4xl">Individual Components 1</p>
            <StylizedBalanceCard value={Number(token?.balance)} />
            <StylizedImageCard src={token?.image} />
            <StylizedStringCard value={token?.name} type="bold" />
            <StylizedStringCard value={token?.description} />
            <StylizedAddressCard address={token?.address} />
            <StylizedStringCard value={`Token Type: ${token?.properties?.tokenType?.toString()}`} />
            <StylizedStringCard
              value={`Max Mint Amount Per Tx: \n${token?.properties?.maxMintAmountPerTx?.toString()}`}
            />
          </div>

          <div>
            <p className="text-center text-4xl">Individual Components 2</p>
            <BalanceCard balance={token?.balance} />
            <ImageCard src={token?.image} />
            <NameCard name={token?.name} />
            <DescriptionCard description={token?.description} />
            <AddressCard address={token?.address} />
            <TokenTypeCard tokenType={token?.properties?.tokenType} />
            <MaxMintAmountPerTxCard maxMintAmountPerTx={token?.properties?.maxMintAmountPerTx} />
          </div>

          <div>
            <p className="text-center text-4xl">Individual Components 3</p>
            <BalanceCard token={token} />
            <ImageCard token={token} />
            <NameCard token={token} />
            <DescriptionCard token={token} />
            <AddressCard token={token} />
            <TokenTypeCard token={token} />
            <MaxMintAmountPerTxCard token={token} />
          </div>
        </div>
        <div className="flex">
          <div>
            <p className="text-center text-4xl">Single Card 1</p>
            <StylizedTokenCard2>
              <StylizedBalanceCard value={Number(token?.balance)} />
              <StylizedImageCard src={token?.image} />
              <StylizedStringCard value={token?.name} type="bold" />
              <StylizedStringCard value={token?.description} />
              <StylizedAddressCard address={token?.address} />
              <StylizedStringCard value={`Token Type: ${token?.properties?.tokenType?.toString()}`} />
              <StylizedStringCard
                value={`Max Mint Amount Per Tx \n${token?.properties?.maxMintAmountPerTx?.toString()}`}
              />
            </StylizedTokenCard2>
          </div>

          <div>
            <p className="text-center text-4xl">Single Card 2</p>
            <StylizedTokenCard2>
              <BalanceCard token={token} />
              <ImageCard token={token} />
              <NameCard token={token} />
              <DescriptionCard token={token} />
              <AddressCard token={token} />
              <TokenTypeCard token={token} />

              <MaxMintAmountPerTxCard token={token} />
            </StylizedTokenCard2>
          </div>

          <div>
            <p className="text-center text-4xl">Single Card 3</p>
            <StylizedTokenCard token={token} />
          </div>
          <div>
            <p className="text-center text-4xl">Single Card 4</p>
            <StylizedTokenCard3 token={token} />
          </div>
        </div>
        <p className="text-center text-4xl">Multi-Card</p>
        <StylizedTokenGroupCard
          tokens={tokens}
          preChildren={<StylizedAddressCard address={tokens.address} isGroup={true} />}
        />

        <p className="text-center text-4xl">Multi-Card w/ Overlay</p>
        <StylizedTokenGroupCard
          tokens={tokens}
          isBalanceOverlayed={true}
          preChildren={<StylizedAddressCard address={tokens.address} isGroup={true} />}
        />

        <p className="text-center text-4xl">Small</p>
        <StylizedTokenGroupCard tokens={tokens} components={widgetComponents} isBalanceOverlayed={true} size="sm" />

        <p className="text-center text-4xl">Faucet</p>
        <StylizedTokenGroupCard tokens={tokens} components={widgetComponents} isBalanceOverlayed={true} size="xs" />

        {/* 
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
        /> */}
      </div>
    </>
  );
}
