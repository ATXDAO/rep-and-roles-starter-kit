import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  name?: string;
  type?: "default" | "bold";
};

export const NameCard = ({ token, name = "", type = "bold" }: Props) => {
  return <StylizedStringCard value={token ? token?.name : name} type={type} />;
};
