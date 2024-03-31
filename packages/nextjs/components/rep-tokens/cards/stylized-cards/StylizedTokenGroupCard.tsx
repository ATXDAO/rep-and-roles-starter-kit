import { Color } from "./Stylized";
import { StylizedAddressCard } from "./StylizedAddressCard";
import { StylizedBalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedBalanceCard";
import { StylizedImageCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedImageCard";
import { StylizedStringCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedStringCard";
import { StylizedTokenCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard";

export interface TokenCardInternalProps {
  tokens: any[];
  components?: ReputationComponent[];
  color?: Color;
}

export type ReputationComponent =
  | "Balance"
  | "Image"
  | "Name"
  | "Description"
  | "Address"
  | "IsSoulbound"
  | "IsRedeemable"
  | "MaxMintAmountPerTx";

export const StylizedTokenGroupCard = ({
  tokens,
  components = [
    "Balance",
    "Image",
    "Name",
    "Description",
    "Address",
    "IsSoulbound",
    "IsRedeemable",
    "MaxMintAmountPerTx",
  ],
  color = "slate",

  children,
}: any) => {
  const output: any[] = [];

  for (let i = 0; i < tokens?.length; i++) {
    const cardContent: any[] = [];

    for (let j = 0; j < components?.length; j++) {
      if (components[j] === "Balance") {
        cardContent.push(<StylizedBalanceCard key={j} value={Number(tokens[i]?.balance)} />);
      }

      if (components[j] === "Image") {
        cardContent.push(<StylizedImageCard key={j} src={tokens[i]?.image} />);
      }

      if (components[j] === "Name") {
        cardContent.push(<StylizedStringCard key={j} value={tokens[i]?.name} type="bold" />);
      }

      if (components[j] === "Description") {
        cardContent.push(<StylizedStringCard key={j} value={tokens[i]?.description} />);
      }

      if (components[j] === "IsSoulbound") {
        cardContent.push(
          <StylizedStringCard key={j} value={`Soulbound: ${tokens[i]?.properties.isSoulbound.toString()}`} />,
        );
      }

      if (components[j] === "IsRedeemable") {
        cardContent.push(
          <StylizedStringCard key={j} value={`Redeemable: ${tokens[i]?.properties.isRedeemable.toString()}`} />,
        );
      }

      if (components[j] === "MaxMintAmountPerTx") {
        cardContent.push(
          <StylizedStringCard
            key={j}
            value={`Max Mint Amount Per Tx: ${tokens[i]?.properties.maxMintAmountPerTx.toString()}`}
          />,
        );
      }

      if (components[j] === "Address") {
        cardContent.push(<StylizedAddressCard key={j} address={tokens[i].address} />);
      }
    }

    const card = <StylizedTokenCard key={i}>{cardContent}</StylizedTokenCard>;
    output.push(card);
  }

  return (
    <div className={`bg-${color}-800 flex flex-col rounded-lg`}>
      {children}
      <div className={`flex justify-center`}>{output}</div>
    </div>
  );
};
