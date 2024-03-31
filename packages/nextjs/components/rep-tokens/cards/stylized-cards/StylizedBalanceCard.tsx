import { Color } from "./Stylized";

type BalanceProps = {
  value: number;
  color?: Color;
  isOverlay?: boolean;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

const normalSizeMap = {
  xs: "2xl",
  sm: "4xl",
  base: "4xl",
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

const overlaidSizeMap = {
  xs: "2xl",
  sm: "4xl",
  base: "9xl",
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

const overlaidCardSizeMap = {
  xs: "inset-x-0 -inset-y-3",
  sm: "inset-0",
  base: "inset-5",
  lg: "",
  xl: "",
  "2xl": "",
  "3xl": "",
};

export const StylizedBalanceCard = ({ value, color = "slate", isOverlay, size = "base" }: BalanceProps) => {
  let cardClasses;
  let textClasses;

  if (isOverlay) {
    cardClasses = `absolute ${overlaidCardSizeMap[size]} items-center justify-center`;
    textClasses = `text-${overlaidSizeMap[size]} mx-auto text-center text-black`;
  } else {
    cardClasses = `rounded-lg bg-${color}-300`;
    textClasses = `text-${normalSizeMap[size]} mx-auto text-center text-black`;
  }

  return (
    <div className={cardClasses}>
      <p className={textClasses}>{value.toString()}</p>
    </div>
  );
};
