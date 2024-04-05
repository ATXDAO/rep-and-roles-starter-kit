import { StylizedStringCard } from "../StylizedStringCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  isRedeemable?: boolean;
  type?: "default" | "bold";
};

export const RedeemableCard = ({ token, isRedeemable, type = "default" }: Props) => {
  return (
    <StylizedStringCard
      value={`Redeemable: ` + (token ? token?.properties?.isRedeemable?.toString() : isRedeemable?.toString())}
      type={type}
    />
  );
};
