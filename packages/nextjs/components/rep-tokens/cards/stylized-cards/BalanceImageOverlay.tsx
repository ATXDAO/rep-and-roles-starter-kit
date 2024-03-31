import { Color } from "./Stylized";
import { StylizedBalanceCard } from "./StylizedBalanceCard";
import { StylizedImageCard } from "./StylizedImageCard";

type BalanceProps = {
  balance: number;
  image: string;
  color?: Color;
};

export const BalanceImageOverlay = ({ balance, image }: BalanceProps) => {
  return (
    <div className="relative">
      <StylizedBalanceCard value={Number(balance)} isOverlay />
      <StylizedImageCard src={image} />
    </div>
  );
};
