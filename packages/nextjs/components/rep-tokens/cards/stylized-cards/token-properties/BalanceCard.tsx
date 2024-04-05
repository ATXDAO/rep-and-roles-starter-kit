import { StylizedBalanceCard } from "../StylizedBalanceCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token: Token;
};

export const BalanceCard = ({ token }: Props) => {
  return <StylizedBalanceCard value={Number(token?.balance)} />;
};
