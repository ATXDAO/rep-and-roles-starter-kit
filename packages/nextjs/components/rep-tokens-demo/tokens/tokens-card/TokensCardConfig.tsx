import { TTokenGroupCardPrettifyLoadingProps, TTokensCardRenderProps } from "./TokensCard";
import { TTokenCardGroupPropertiesClasses } from "./TokensCard";

export const navBarRenderProps = {
  address: true,
  tokenCardRenderProps: {
    balance: true,
    image: true,
    name: false,
    description: false,
  },
} as TTokensCardRenderProps;

export const mainCardRenderProps = {
  address: true,
  tokenCardRenderProps: {
    balance: true,
    image: true,
    name: true,
    description: true,
  },
} as TTokensCardRenderProps;

export const navBarPropertiesClasses = {
  card: "bg-base-300 flex flex-col items-center",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-1 py-1 relative w-20",
    baseTokenCardPropertyClasses: {
      balance: {
        container: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        value: "text-4xl text-center justify-center",
      },
      image: {
        value: "rounded mx-auto",
      },
    },
  },
} as TTokenCardGroupPropertiesClasses;

export const mainCardWithNumberOverlayPropertiesClasses = {
  card: "bg-base-300 flex flex-col items-center",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-5 py-5 relative w-64",
    baseTokenCardPropertyClasses: {
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
  },
} as TTokenCardGroupPropertiesClasses;

export const mainCardPropertiesClasses = {
  card: "bg-base-300 flex flex-col items-center",
  container: "flex justify-center",
  tokenCardPropertyClasses: {
    card: "px-5 py-5 w-64",
    baseTokenCardPropertyClasses: {
      balance: {
        value: "text-4xl mx-auto text-center",
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
  },
} as TTokenCardGroupPropertiesClasses;

export const prettifyLoadingProps = {
  card: true,
  tokenCardPrettifyLoadingProps: {
    card: false,
    baseTokenCardPrettifyLoadingProps: {
      balance: false,
      image: false,
      name: false,
      description: false,
    },
  },
} as TTokenGroupCardPrettifyLoadingProps;
