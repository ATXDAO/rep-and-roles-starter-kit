import { Token } from "../../hooks/Hooks";
import { BalanceImageOverlay } from "./BalanceImageOverlay";
import { ReputationComponent } from "./StylizedTokenGroupCard";
import { AddressCard } from "./token-properties/AddressCard";
import { BalanceCard } from "./token-properties/BalanceCard";
import { DescriptionCard } from "./token-properties/DescriptionCard";
import { ImageCard } from "./token-properties/ImageCard";
import { MaxMintAmountPerTxCard } from "./token-properties/MaxMintAmountPerTxCard";
import { NameCard } from "./token-properties/NameCard";
import { TokenTypeCard } from "./token-properties/TokenTypeCard";

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
          cardContent.push(<BalanceCard key={j} token={token} isOverlay={false} size={size} />);
        }
      } else {
        cardContent.push(<BalanceCard key={j} token={token} isOverlay={false} size={size} />);
      }
    }

    if (!isBalanceOverlayed) {
      if (components[j] === "Image") {
        cardContent.push(<ImageCard key={j} token={token} />);
      }
    }

    if (components[j] === "Name") {
      cardContent.push(<NameCard key={j} token={token} />);
    }

    if (components[j] === "Description") {
      cardContent.push(<DescriptionCard key={j} token={token} />);
    }

    if (components[j] === "TokenType") {
      cardContent.push(<TokenTypeCard key={j} token={token} />);
    }

    if (components[j] === "MaxMintAmountPerTx") {
      cardContent.push(<MaxMintAmountPerTxCard key={j} token={token} />);
    }

    if (components[j] === "Address") {
      cardContent.push(<AddressCard key={j} token={token} />);
    }
  }

  return <div className={`bg-base-100 rounded-lg ${sizeMap[size]} relative p-1`}>{cardContent}</div>;
};
