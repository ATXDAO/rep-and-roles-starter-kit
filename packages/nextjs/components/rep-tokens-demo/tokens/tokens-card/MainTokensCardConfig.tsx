import { TBaseTokenCardBooleanSet } from "../token-card/BaseTokenCard";
import { TTokenCardPrettifyLoadingProps, TTokenCardPropertiesClasses } from "../token-card/TokenCard";
import { TTokenGroupCardPrettifyLoadingProps, TTokensCardRenderProps } from "./TokensCard";
import { TTokenCardGroupPropertiesClasses } from "./TokensCard";

export const tokensCardRenderProps = {
  address: true,
} as TTokensCardRenderProps;

export const tokenCardRenderProps = {
  balance: true,
  image: true,
  name: true,
  description: true,
} as TBaseTokenCardBooleanSet;

export const tokensCardPropertiesClasses = {
  card: "bg-base-300 flex flex-col items-center",
  container: "flex justify-center",
} as TTokenCardGroupPropertiesClasses;

export const tokenCardPropertiesClasses = {
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
} as TTokenCardPropertiesClasses;

export const tokensCardPrettifyLoadingProps = {
  card: true,
} as TTokenGroupCardPrettifyLoadingProps;

export const tokenCardPrettifyLoadingProps = {
  card: false,
  baseTokenCardPrettifyLoadingProps: {
    balance: false,
    image: false,
    name: false,
    description: false,
  },
} as TTokenCardPrettifyLoadingProps;
