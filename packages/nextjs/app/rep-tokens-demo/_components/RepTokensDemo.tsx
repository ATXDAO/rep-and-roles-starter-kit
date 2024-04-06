"use client";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAccount } from "wagmi";
import { ReputationTokenCard } from "~~/components/rep-tokens/cards/ReputationTokenCard";
import { ReputationTokenGroupCard } from "~~/components/rep-tokens/cards/ReputationTokenGroupCard";
import { StylizedAddressCard } from "~~/components/rep-tokens/cards/internal/StylizedAddressCard";
import { AddressCard } from "~~/components/rep-tokens/cards/token-properties/AddressCard";
import { BalanceCard } from "~~/components/rep-tokens/cards/token-properties/BalanceCard";
import { DescriptionCard } from "~~/components/rep-tokens/cards/token-properties/DescriptionCard";
import { ImageCard } from "~~/components/rep-tokens/cards/token-properties/ImageCard";
import { MaxMintAmountPerTxCard } from "~~/components/rep-tokens/cards/token-properties/MaxMintAmountPerTxCard";
import { NameCard } from "~~/components/rep-tokens/cards/token-properties/NameCard";
import { TokenTypeCard } from "~~/components/rep-tokens/cards/token-properties/TokenTypeCard";
import { useGetRepToken, useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import { useScaffoldContract, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function RepTokensDemo() {
  const { address } = useAccount();

  const { token, refetchBalance } = useGetRepToken(address, BigInt(0), "nftstorage");

  const { tokensData: tokens, refetchBalances: refetchUserBalances } = useRepTokens(address, "nftstorage");

  const { writeAsync: claim } = useScaffoldContractWrite({
    contractName: "ReputationFaucet",
    functionName: "claim",
  });

  const { data: faucet } = useScaffoldContract({ contractName: "ReputationFaucet" });

  const { tokensData: faucetTokens, refetchBalances: refetchFaucetBalances } = useRepTokens(
    faucet?.address,
    "nftstorage",
  );

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Multi-Card</Tab>
          <Tab>Multi-Card w/ Overlay</Tab>
          <Tab>Small</Tab>
          <Tab>Widget</Tab>
          <Tab>Single Card</Tab>
          <Tab>Individual Components</Tab>
          <Tab>Faucet</Tab>
        </TabList>

        <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
          <TabPanel>
            <p className="text-center text-4xl">Multi-Card</p>
            <ReputationTokenGroupCard
              tokens={tokens}
              preChildren={<StylizedAddressCard address={tokens.address} isGroup={true} />}
            />
          </TabPanel>

          <TabPanel>
            <p className="text-center text-4xl">Multi-Card w/ Overlay</p>
            <ReputationTokenGroupCard
              tokens={tokens}
              isBalanceOverlayed={true}
              preChildren={<StylizedAddressCard address={tokens.address} isGroup={true} />}
            />
          </TabPanel>

          <TabPanel>
            <p className="text-center text-4xl">Small</p>
            <ReputationTokenGroupCard
              tokens={tokens}
              components={["Balance", "Image"]}
              isBalanceOverlayed={true}
              size="sm"
            />
          </TabPanel>

          <TabPanel>
            <p className="text-center text-4xl">Widget</p>
            <ReputationTokenGroupCard
              tokens={tokens}
              components={["Balance", "Image"]}
              isBalanceOverlayed={true}
              size="xs"
            />
          </TabPanel>

          <TabPanel>
            <p className="text-center text-4xl">Single Card</p>
            <ReputationTokenCard token={token} />
          </TabPanel>

          <TabPanel>
            <p className="text-center text-4xl">Individual Components</p>
            <BalanceCard token={token} />
            <ImageCard token={token} />
            <NameCard token={token} />
            <DescriptionCard token={token} />
            <AddressCard token={token} />
            <TokenTypeCard token={token} />
            <MaxMintAmountPerTxCard token={token} />
          </TabPanel>

          <TabPanel>
            <ReputationTokenGroupCard
              tokens={faucetTokens}
              components={["Balance", "Image"]}
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
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
}
