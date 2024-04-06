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

const overlaidCardSizeMap = {
  xs: "inset-0",
  sm: "inset-0",
  base: "inset-0",
  lg: "",
  xl: "",
  "2xl": "",
  "3xl": "",
};

const formatNumber = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";

  return "";
};

export const StylizedBalanceCard = ({ value, isOverlay, size = "base" }: BalanceProps) => {
  let cardClasses;
  let textClasses;
  let output = "";

  if (isOverlay) {
    cardClasses = `absolute ${overlaidCardSizeMap[size]} flex items-center justify-center bg-base-300 bg-opacity-60`;

    output = formatNumber(123411).toString();
    let result = "";

    if (size === "xs") {
      if (output.length === 0) {
        result = "text-4xl";
      } else if (output.length === 1) {
        result = "text-4xl";
      } else if (output.length === 2) {
        result = "text-4xl";
      } else if (output.length === 3) {
        result = "text-2xl";
      } else if (output.length === 4) {
        result = "text-lg";
      } else if (output.length === 5) {
        result = "text-md";
      } else if (output.length === 6) {
        result = "text-sm";
      }
    } else if (size === "base") {
      if (output.length === 0) {
        result = "text-9xl";
      } else if (output.length === 1) {
        result = "text-9xl";
      } else if (output.length === 2) {
        result = "text-9xl";
      } else if (output.length === 3) {
        result = "text-8xl";
      } else if (output.length === 4) {
        result = "text-8xl";
      } else if (output.length === 5) {
        result = "text-8xl";
      } else if (output.length === 6) {
        result = "text-7xl";
      }
    } else if (size === "sm") {
      if (output.length === 0) {
        result = "text-9xl";
      } else if (output.length === 1) {
        result = "text-6xl";
      } else if (output.length === 2) {
        result = "text-6xl";
      } else if (output.length === 3) {
        result = "text-4xl";
      } else if (output.length === 4) {
        result = "text-3xl";
      } else if (output.length === 5) {
        result = "text-2xl";
      } else if (output.length === 6) {
        result = "text-xl";
      }
    }

    textClasses = `${result} mx-auto text-center`;
  } else {
    cardClasses = `rounded-lg bg-base-300`;
    textClasses = `${normalSizeMap[size]} mx-auto text-center`;
    output = value.toString();
  }

  return (
    <div className={cardClasses}>
      <p className={textClasses}>{output}</p>
    </div>
  );
};
