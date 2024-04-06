import { StylizedStringCard } from "../internal/StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  maxMintAmountPerTx?: number;
  type?: "default" | "bold";
};

export const MaxMintAmountPerTxCard = ({ token, maxMintAmountPerTx, type = "default" }: Props) => {
  return (
    <StylizedStringCard
      value={
        `Max Mint Amount Per Tx: ` + (token ? token?.properties?.maxMintAmountPerTx?.toString() : maxMintAmountPerTx)
      }
      type={type}
    />
  );
};
