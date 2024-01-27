import { TokenCardClasses } from "../rep-tokens/cards/token-card/TokenCard";
import { TokenGroupCardElementsClasses } from "../rep-tokens/cards/token-group-card/TokenGroupCard";

export const tokensCardPropertiesClasses = {
  card: "bg-base-300 flex flex-col items-center",
  container: "flex justify-center",
} as TokenGroupCardElementsClasses;

export const tokenCardPropertiesClasses = {
  card: "px-5 py-5 relative w-64",
  baseTokenCardElementsClasses: {
    balance: {
      container: "absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/3",
      value: "text-9xl mx-auto text-center",
    },
    name: {
      value: "text-1xl text-center object-center mx-auto font-bold break-all",
    },
    description: {
      value: "text-1xl mx-auto text-center break-words",
    },
    image: {
      value: "rounded mx-auto",
    },
  },
} as TokenCardClasses;
