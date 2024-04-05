import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  description?: string;

  type?: "default" | "bold";
};

export const DescriptionCard = ({ token, description = "", type = "default" }: Props) => {
  return <StylizedStringCard value={token ? token?.description : description} type={type} />;
};
