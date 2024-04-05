import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token: Token;
  type?: "default" | "bold";
};

export const RedeemableCard = ({ token, type = "default" }: Props) => {
  return <StylizedStringCard value={`Redeemable: ` + token?.properties?.isRedeemable?.toString()} type={type} />;
};
