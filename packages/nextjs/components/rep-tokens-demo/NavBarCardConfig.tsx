import { TokenCardClasses } from "../rep-tokens/cards/token-card/TokenCard";
import { TokenGroupCardElementsClasses } from "../rep-tokens/cards/token-group-card/TokenGroupCard";

export const tokensCardPropertiesClasses = {
  container: "flex justify-center",
  card: "bg-slate-800 flex flex-col items-center",
  address: {
    container: "flex items-center justify-center bg-slate-600",
    value: "ml-1.5 text-${size} font-normal text-white",
  },
} as TokenGroupCardElementsClasses;

export const tokenCardPropertiesClasses = {
  card: "px-1 py-1 relative w-20 ",
  baseTokenCardElementsClasses: {
    balance: {
      container: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      value: "text-4xl text-center justify-center",
    },
    image: {
      value: "rounded mx-auto",
    },
  },
} as TokenCardClasses;
