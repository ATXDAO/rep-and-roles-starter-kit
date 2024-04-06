import { StylizedBalanceCard } from "../internal/StylizedBalanceCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  balance?: bigint;
  isOverlay?: boolean;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

export const BalanceCard = ({ token, balance, isOverlay, size }: Props) => {
  return (
    <StylizedBalanceCard value={token ? Number(token?.balance) : Number(balance)} isOverlay={isOverlay} size={size} />
  );
};
