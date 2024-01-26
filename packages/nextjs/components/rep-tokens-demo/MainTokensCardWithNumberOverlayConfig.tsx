import {
  IsBeautifyingTokenCardLoadingProps,
  IsRenderingTokenCardProps,
  TokenCardElementsClasses,
} from "../rep-tokens/cards/token-card/TokenCard";
import {
  IsBeautifyingTokenGroupCardLoadingProps,
  IsRenderingTokenGroupCardProps,
} from "../rep-tokens/cards/token-group-card/TokenGroupCard";
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
} as TokenCardElementsClasses;

export const tokensCardRenderProps = {
  card: true,
  address: true,
} as IsRenderingTokenGroupCardProps;

export const isRenderingTokenCardProps = {
  card: true,
  isRenderingElementsProps: {
    balance: true,
    image: true,
    name: true,
    description: true,
    address: true,
  },
} as IsRenderingTokenCardProps;

export const tokensCardPrettifyLoadingProps = {
  card: true,
} as IsBeautifyingTokenGroupCardLoadingProps;

export const tokenCardPrettifyLoadingProps = {
  card: false,
  isBeautifyLoadingElementsProps: {
    balance: false,
    image: false,
    name: false,
    description: false,
  },
} as IsBeautifyingTokenCardLoadingProps;
