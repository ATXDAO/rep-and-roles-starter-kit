import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  tokenType?: number;
  type?: "default" | "bold";
};

export const TokenTypeCard = ({ token, tokenType, type = "default" }: Props) => {
  let i = "Token Type: ";

  if (token) {
    if (token?.properties?.tokenType === 0) {
      i += "Transferable";
    } else if (token?.properties?.tokenType === 1) {
      i += "Soulbound";
    } else if (token?.properties?.tokenType === 2) {
      i += "Redeemable";
    }
  } else if (tokenType) {
    if (tokenType === 0) {
      i += "Transferable";
    } else if (tokenType === 1) {
      i += "Soulbound";
    } else if (tokenType === 2) {
      i += "Redeemable";
    }
  }

  return (
    <StylizedStringCard
      value={i}
      //   value={`Soulbound: ` + (token ? token?.properties?.isSoulbound?.toString() : isSoulbound?.toString())}
      type={type}
    />
  );
};
