import { Token } from "../../hooks/Hooks";
import { BalanceImageOverlay } from "./BalanceImageOverlay";
import { StylizedAddressCard } from "./StylizedAddressCard";
import { StylizedBalanceCard } from "./StylizedBalanceCard";
import { StylizedImageCard } from "./StylizedImageCard";
import { StylizedStringCard } from "./StylizedStringCard";
import { ReputationComponent } from "./StylizedTokenGroupCard";

export type Size = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export interface TokenCardInternalProps {
  token: Token;
  size?: Size;
  children?: React.ReactNode;
  components?: ReputationComponent[];
  isBalanceOverlayed?: boolean;
}

const sizeMap = {
  xs: "",
  sm: "px-1 py-1 w-20",
  base: "p-5 m-4 w-64",
  lg: "",
  xl: "",
  "2xl": "",
  "3xl": "",
};

export const StylizedTokenCard = ({
  size = "base",
  // children,
  token,
  components = ["Balance", "Image", "Name", "Description", "Address", "TokenType", "MaxMintAmountPerTx"],
  isBalanceOverlayed = false,
}: TokenCardInternalProps) => {
  const cardContent: JSX.Element[] = [];

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
            <BalanceImageOverlay key={j} balance={Number(token?.balance)} image={token?.image} size={size} />,
          );
        } else {
          cardContent.push(
            <StylizedBalanceCard key={j} value={Number(token?.balance)} isOverlay={false} size={size} />,
          );
        }
      } else {
        cardContent.push(<StylizedBalanceCard key={j} value={Number(token?.balance)} isOverlay={false} size={size} />);
      }
    }

    if (!isBalanceOverlayed) {
      if (components[j] === "Image") {
        cardContent.push(<StylizedImageCard key={j} src={token?.image} size={size} />);
      }
    }

    if (components[j] === "Name") {
      cardContent.push(<StylizedStringCard key={j} value={token?.name} type="bold" />);
    }

    if (components[j] === "Description") {
      cardContent.push(<StylizedStringCard key={j} value={token?.description} />);
    }

    if (components[j] === "TokenType") {
      cardContent.push(<StylizedStringCard value={`Token Type: ${token?.properties?.tokenType?.toString()}`} />);
    }

    if (components[j] === "MaxMintAmountPerTx") {
      cardContent.push(
        <StylizedStringCard
          key={j}
          value={`Max Mint Amount Per Tx: ${token?.properties?.maxMintAmountPerTx?.toString()}`}
        />,
      );
    }

    if (components[j] === "Address") {
      cardContent.push(<StylizedAddressCard key={j} address={token?.address} />);
    }
  }

  return (
    <div className={`bg-base-100 rounded-lg ${sizeMap[size]} relative p-1`}>
      {/* {children} */}
      {cardContent}
    </div>
  );
};
