import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token: Token;
  type?: "default" | "bold";
};

export const NameCard = ({ token, type = "bold" }: Props) => {
  return <StylizedStringCard value={token?.name} type={type} />;
};
