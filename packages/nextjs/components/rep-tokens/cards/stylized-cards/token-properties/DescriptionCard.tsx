import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token: Token;
  type?: "default" | "bold";
};

export const DescriptionCard = ({ token, type = "default" }: Props) => {
  return <StylizedStringCard value={token?.description} type={type} />;
};
