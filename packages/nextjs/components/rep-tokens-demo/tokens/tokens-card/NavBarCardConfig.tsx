import { TBaseTokenCardBooleanSet } from "../token-card/TokenCard";
import { TTokenCardPrettifyLoadingProps, TTokenCardPropertiesClasses } from "../token-card/TokenCardWithContainer";
import { TTokenGroupCardPrettifyLoadingProps, TTokensCardRenderProps } from "./TokensCard";
import { TTokenCardGroupPropertiesClasses } from "./TokensCard";

export const tokensCardPropertiesClasses = {
  card: "bg-base-300 flex flex-col items-center",
  container: "flex justify-center",
} as TTokenCardGroupPropertiesClasses;

export const tokenCardPropertiesClasses = {
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
} as TTokenCardPropertiesClasses;

export const tokenCardRenderProps = {
  balance: true,
  image: true,
  name: false,
  description: false,
} as TBaseTokenCardBooleanSet;

export const tokensCardRenderProps = {
  address: true,
} as TTokensCardRenderProps;

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
