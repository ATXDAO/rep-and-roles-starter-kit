import { StylizedBalanceCard } from "../StylizedBalanceCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  balance?: bigint;
};

export const BalanceCard = ({ token, balance }: Props) => {
  return <StylizedBalanceCard value={token ? Number(token?.balance) : Number(balance)} />;
};
