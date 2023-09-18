import { TBaseTokenCardRenderSettings } from "../token-card/BaseTokenCard";
import { TTokenGroupCardPrettifyLoadingProps } from "./DefaultTokenGroupCard";
import { TTokenCardGroupPropertiesClasses } from "./DefaultTokenGroupCard";

export const navBarRenderProps = {
  balance: true,
  image: true,
  name: false,
  description: false,
} as TBaseTokenCardRenderSettings;

export const mainCardRenderProps = {
  balance: true,
  image: true,
  name: true,
  description: true,
} as TBaseTokenCardRenderSettings;

export const navBarPropertiesClasses = {
  card: "bg-base-300",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-1 py-1 relative w-20",
    baseTokenCardPropertyClasses: {
      balanceClasses: {
        container: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        balance: "text-4xl text-center justify-center",
      },
      image: "rounded mx-auto",
      name: "text-1xl text-center object-center mx-auto font-bold break-all",
      description: "text-1xl mx-auto text-center break-words",
    },
  },
} as TTokenCardGroupPropertiesClasses;

export const mainCardWithNumberOverlayPropertiesClasses = {
  card: "bg-base-300",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-5 py-5 relative w-64",
    baseTokenCardPropertyClasses: {
      balanceClasses: {
        container: "absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/3",
        balance: "text-9xl mx-auto text-center",
      },
      name: "text-1xl text-center object-center mx-auto font-bold",
      description: "text-1xl mx-auto text-center",
      image: "rounded mx-auto",
    },
  },
} as TTokenCardGroupPropertiesClasses;

export const mainCardPropertiesClasses = {
  card: "bg-base-300",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-5 py-5 w-64",
    baseTokenCardPropertyClasses: {
      balanceClasses: {
        balance: "text-4xl mx-auto text-center",
      },
      name: "text-1xl text-center object-center mx-auto font-bold",
      description: "text-1xl mx-auto text-center",
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
