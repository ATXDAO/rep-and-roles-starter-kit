type BalanceProps = {
  value: number;
  isOverlay?: boolean;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

const normalSizeMap = {
  xs: "text-2xl",
  sm: "text-4xl",
  base: "text-4xl",
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

const overlaidSizeMap = {
  xs: "text-2xl",
  sm: "text-4xl",
  base: "text-9xl",
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

export const StylizedBalanceCard = ({ value, isOverlay, size = "base" }: BalanceProps) => {
  let cardClasses;
  let textClasses;

  if (isOverlay) {
    cardClasses = `absolute ${overlaidCardSizeMap[size]} items-center justify-center bg-base-300 bg-opacity-75`;
    textClasses = `${overlaidSizeMap[size]} mx-auto text-center`;
  } else {
    cardClasses = `rounded-lg bg-base-300`;
    textClasses = `${normalSizeMap[size]} mx-auto text-center`;
  }

  return (
    <div className={cardClasses}>
      <p className={textClasses}>{value.toString()}</p>
    </div>
  );
};
