import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token: Token;
  type?: "default" | "bold";
};

export const MaxMintAmountPerTxCard = ({ token, type = "default" }: Props) => {
  return (
    <StylizedStringCard
      value={`Max Mint Amount Per Tx: ` + token?.properties?.maxMintAmountPerTx?.toString()}
      type={type}
    />
  );
};
