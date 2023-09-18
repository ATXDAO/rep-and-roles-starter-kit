import { TTokenGroupCardPrettifyLoadingProps } from "./DefaultTokenGroupCard";
import { TTokenCardGroupPropertiesClasses } from "./DefaultTokenGroupCard";

export const navBarPropertiesClasses = {
  card: "bg-base-300",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-1 relative",
    baseTokenCardPropertyClasses: {
      balanceClasses: {
        container: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        balance: "text-4xl text-center justify-center",
      },
      image: "rounded mx-auto",
    },
  },
} as TTokenCardGroupPropertiesClasses;

export const mainCardPropertiesClasses = {
  card: "bg-base-300",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-5 relative",
    baseTokenCardPropertyClasses: {
      balanceClasses: {
        container: "absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3",
        balance: "text-9xl mx-auto text-center",
      },
      name: "w-64 text-1xl text-center object-center mx-auto font-bold",
      description: "w-64 text-1xl mx-auto text-center",
      image: "rounded mx-auto",
    },
  },
} as TTokenCardGroupPropertiesClasses;

export const mainCardWithNumberOverlayPropertiesClasses = {
  card: "bg-base-300",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-5",
    baseTokenCardPropertyClasses: {
      balanceClasses: {
        balance: "text-4xl mx-auto text-center",
      },
      name: "w-64 text-1xl text-center object-center mx-auto font-bold",
      description: "w-64 text-1xl mx-auto text-center",
      image: "rounded mx-auto",
    },
  },
} as TTokenCardGroupPropertiesClasses;

export const prettifyLoadingProps = {
  card: false,
  tokenCardPrettifyLoadingProps: {
    card: false,
    baseTokenCardPrettifyLoadingProps: {
      balance: true,
      image: true,
      name: true,
      description: true,
    },
  },
} as TTokenGroupCardPrettifyLoadingProps;
