import { StylizedBalanceCard } from "./StylizedBalanceCard";
import { StylizedImageCard } from "./StylizedImageCard";
import { Color } from "./deprecated/Stylized";

type BalanceProps = {
  balance: number;
  image: string;
  color?: Color;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

export const BalanceImageOverlay = ({ balance, image, size = "base" }: BalanceProps) => {
  return (
    <div className="relative">
      <StylizedBalanceCard value={Number(balance)} isOverlay={true} size={size} />
      <StylizedImageCard src={image} size={size} />
    </div>
  );
};
