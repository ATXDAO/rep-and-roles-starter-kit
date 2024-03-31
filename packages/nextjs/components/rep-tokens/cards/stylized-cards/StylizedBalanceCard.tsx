import { Color } from "./Stylized";

type BalanceProps = {
  value: number;
  color?: Color;
  isOverlay?: boolean;
};

export const StylizedBalanceCard = ({ value, color = "slate", isOverlay }: BalanceProps) => {
  let cardClasses;
  let textClasses;

  if (isOverlay) {
    cardClasses = "absolute inset-10 items-center justify-center";
    textClasses = "text-9xl mx-auto text-center text-black";
  } else {
    cardClasses = `rounded-lg bg-${color}-300`;
    textClasses = "text-4xl mx-auto text-center text-black";
  }

  return (
    <div className={cardClasses}>
      <p className={textClasses}>{value.toString()}</p>
    </div>
  );
};
