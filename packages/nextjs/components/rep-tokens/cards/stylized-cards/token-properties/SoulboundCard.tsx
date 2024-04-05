import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token: Token;
  type?: "default" | "bold";
};

export const SoulboundCard = ({ token, type = "default" }: Props) => {
  return <StylizedStringCard value={`Soulbound: ` + token?.properties?.isSoulbound?.toString()} type={type} />;
};
