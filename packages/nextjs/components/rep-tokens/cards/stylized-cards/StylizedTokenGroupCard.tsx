import { BalanceImageOverlay } from "./BalanceImageOverlay";
import { StylizedAddressCard } from "./StylizedAddressCard";
import { StylizedBalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedBalanceCard";
import { StylizedImageCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedImageCard";
import { StylizedStringCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedStringCard";
import { StylizedTokenCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard";

export interface TokenCardInternalProps {
  tokens: any[];
  components?: ReputationComponent[];
  isBalanceOverlayed?: boolean;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  children?: React.ReactNode;
}

const sizeMap = {
  xs: "p-1",
  sm: "p-5",
  base: "p-5",
  lg: "",
  xl: "",
  "2xl": "",
  "3xl": "",
};

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
  isBalanceOverlayed,
  children,
  size = "base",
}: TokenCardInternalProps) => {
  const output: any[] = [];

  for (let i = 0; i < tokens?.length; i++) {
    const cardContent: any[] = [];

    for (let j = 0; j < components?.length; j++) {
      if (components[j] === "Balance") {
        if (isBalanceOverlayed) {
          let doesImageComponentExist;
          for (let k = 0; k < components?.length; k++) {
            if (k === j) continue;

            if (components[k] === "Image") {
              doesImageComponentExist = true;
              break;
            }
          }

          if (doesImageComponentExist) {
            cardContent.push(
              <BalanceImageOverlay key={j} balance={Number(tokens[i]?.balance)} image={tokens[i]?.image} size={size} />,
            );
          } else {
            cardContent.push(
              <StylizedBalanceCard key={j} value={Number(tokens[i]?.balance)} isOverlay={false} size={size} />,
            );
          }
        } else {
          cardContent.push(
            <StylizedBalanceCard key={j} value={Number(tokens[i]?.balance)} isOverlay={false} size={size} />,
          );
        }
      }

      // if (components[j] == "Balance")
      //   if (components[j] === "Balance") {
      //     cardContent.push(
      //       <StylizedBalanceCard key={j} value={Number(tokens[i]?.balance)} isOverlay={isBalanceOverlayed} />,
      //     );
      //   }

      if (!isBalanceOverlayed) {
        if (components[j] === "Image") {
          cardContent.push(<StylizedImageCard key={j} src={tokens[i]?.image} size={size} />);
        }
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

    const card = (
      <StylizedTokenCard key={i} size={size}>
        {cardContent}
      </StylizedTokenCard>
    );
    output.push(card);
  }

  return (
    <div className={`bg-base-100 flex flex-col rounded-lg ${sizeMap[size]}`}>
      {children}
      <div className={`flex justify-center ${sizeMap[size]} rounded-lg bg-base-200`}>{output}</div>
    </div>
  );
};
