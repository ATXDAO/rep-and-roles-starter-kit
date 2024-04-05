import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  isSoulbound?: boolean;
  type?: "default" | "bold";
};

export const SoulboundCard = ({ token, isSoulbound, type = "default" }: Props) => {
  return (
    <StylizedStringCard
      value={`Soulbound: ` + (token ? token?.properties?.isSoulbound?.toString() : isSoulbound?.toString())}
      type={type}
    />
  );
};
