import { TTokenGroupCardPrettifyLoadingProps } from "./TokenGroupCard";
import { TTokenCardGroupPropertyClasses } from "./TokenGroupCard";

export const propertyClasses = {
  card: "bg-base-300",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-5",
    baseTokenCardPropertyClasses: {
      balance: "w-64 text-4xl mx-auto text-center",
      name: "w-64 text-1xl text-center object-center mx-auto font-bold",
      description: "w-64 text-1xl mx-auto text-center",
      image: "w-64 rounded mx-auto",
    },
  },
} as TTokenCardGroupPropertyClasses;

export const prettifyLoadingProps = {
  card: true,
  tokenCardPrettifyLoadingProps: {
    card: true,
    tokenCardInternalPrettifyLoadingProps: {
      balance: true,
      imageUri: true,
      name: true,
      description: true,
    },
  },
} as TTokenGroupCardPrettifyLoadingProps;
